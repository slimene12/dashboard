/* import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const handler = NextAuth(authConfig);

export const GET = handler;
export const POST = handler; */
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const handler = NextAuth(authConfig);

// Exporter chaque méthode comme fonction
export { handler as GET, handler as POST };
