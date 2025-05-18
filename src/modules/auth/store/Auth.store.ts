import { makeAutoObservable, runInAction } from 'mobx';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

export interface IUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: string;
}

class AuthStore {
  user: IUser | null = null;
  isAuthorized: boolean = false;
  accessToken: string | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.hydrateFromNextAuth();
  }

  private async hydrateFromNextAuth() {
    const session = await getSession();
    runInAction(() => {
      this.loading = false;
      if (session?.accessToken) {
        this.accessToken = session.accessToken as string;
      }
      if (session?.user) {
        this.user = session.user as IUser;
      }
    });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  clear() {
    this.accessToken = null;
    this.user = null;
  }

  updateFromNextAuthSession(session: Session) {
    if (session.accessToken) this.accessToken = session.accessToken as string;
    if (session.user) this.user = session.user as IUser;
  }
}

export const authStore = new AuthStore();
