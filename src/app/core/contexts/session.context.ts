import { Injectable, inject } from '@angular/core';
import { Auth, User as FireUser, ParsedToken, authState, signOut } from '@angular/fire/auth';
import { Observable, firstValueFrom } from 'rxjs';

import { UserRepository } from '@repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class SessionContext {
  private auth = inject(Auth);
  private userRepository = inject(UserRepository);

  constructor() {
    this.authState$.subscribe(async currentUser => {
      if (currentUser) {
        await this.userRepository.setLastAccess(currentUser.uid);
      }
    });
  }

  get authState$(): Observable<FireUser> {
    return authState(this.auth);
  }

  async getBearerToken(): Promise<string> {
    const userLogged = await this.getFirebaseUser();
    return userLogged.getIdToken();
  }

  async getClaims(): Promise<ParsedToken> {
    const currentUser = await this.getFirebaseUser();

    const { claims } = await currentUser.getIdTokenResult();

    return claims;
  }

  getFirebaseUser(): Promise<FireUser> {
    return firstValueFrom(this.authState$);
  }

  async getFirebaseUserId(): Promise<string> {
    const { uid } = await this.getFirebaseUser();
    return uid;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
