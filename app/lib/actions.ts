'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Veuiller sélectionner un client',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'veuillez entrer un montant superieur à 0' }),
  date: z.string(),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'veuillez sélectionner le status de la facture',
  }),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'champ manquant , échec de la création de la facture',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO invoices (customer_Id,amount,status,date) 
    VALUES(${customerId},${amountInCents},${status},${date})
  `;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return {
      message:
        'Erreur base de donnée : échec lors de la création de la facture',
      error,
    };
  }

  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'champ manquant , échec de la mise à jour de la facture',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE  invoices 
    SET customer_Id=${customerId},amount=${amountInCents},status =${status}
    WHERE id=${id}
  `;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return {
      message:
        'Erreur base de donnée : échec lors de la mise à jour de la facture',
      error,
    };
  }
  redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
  try {
    await sql`
    DELETE FROM invoices
    WHERE id=${id}
  `;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return {
      message:
        'Erreur base de donnée : échec lors de la suppression de la facture',
      error,
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'identifiants invalides';

        default:
          return "Quelque chose c'est mal passé";
      }
    }
    throw error;
  }
}
