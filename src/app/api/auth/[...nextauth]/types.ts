import { DefaultSession, User } from "next-auth";

export interface CustomAuthUser extends User {
  id: string;
  email: string
  name: string
  role: string
}

declare module 'next-auth' {
  interface Session {
    user?: CustomAuthUser & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: CustomAuthUser;
  }
}
