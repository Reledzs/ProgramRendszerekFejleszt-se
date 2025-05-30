import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      userid: string;
      role: string;
      isAdmin: boolean;
    };
  }
}