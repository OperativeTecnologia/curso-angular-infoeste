import { inject, Injectable } from '@angular/core';
import {
  Auth,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyPasswordResetCode
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  /**
   * Asynchronously signs in using an email and password.
   *
   * @param email - The users email address.
   * @param password - The users password.
   */
  signin(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Sends a password reset email to the given email address.
   *
   * @param email - The user's email address.
   */
  recoverPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Checks a password reset code sent to the user by email or other out-of-band mechanism.
   *
   * @returns the user's email address if valid.
   *
   * @param code - A verification code sent to the user.
   */
  verifyPasswordResetCode(actionCode: string) {
    return verifyPasswordResetCode(this.auth, actionCode);
  }

  /**
   * Completes the password reset process, given a confirmation code and new password.
   *
   * @param oobCode - A confirmation code sent to the user.
   * @param newPassword - The new password.
   */
  async resetPassword(oobCode: string, newPassword: string) {
    await confirmPasswordReset(this.auth, oobCode, newPassword);
  }
}
