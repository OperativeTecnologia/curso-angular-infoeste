import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, getQueryParam, IsLoadingDirective } from '@burand/angular';
import { errorTailorImports } from '@ngneat/error-tailor';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

import { InputPasswordComponent } from '@forms/input-password/input-password.component';
import { InputComponent } from '@forms/input/input.component';
import { AuthService } from '@services/auth.service';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputComponent, InputPasswordComponent, IsLoadingDirective, errorTailorImports]
})
export class ResetPasswordPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private authService = inject(AuthService);

  oobCode = getQueryParam('oobCode');

  form = this.formBuilder.group({
    email: [{ value: null, disabled: true }, [Validators.required, emailValidator]],
    newPassword: [null, [Validators.required, Validators.minLength(6)]]
  });

  mutation = injectMutation<unknown, Error, typeof this.form.value>(() => ({
    mutationFn: async ({ newPassword }) => {
      await this.authService.resetPassword(this.oobCode, newPassword);
    },
    onSuccess: () => {
      this.toastrService.success('Senha alterada com sucesso!');
      this.router.navigateByUrl('/login', {
        replaceUrl: true
      });
    },
    onError: () => {
      this.toastrService.error('O código de recuperação ou e-mail informado estão inválidos.', 'Erro!');
    }
  }));

  async ngOnInit() {
    if (!this.oobCode) {
      this.router.navigateByUrl('/forgot-password', {
        replaceUrl: true
      });

      return;
    }

    try {
      const accountEmail = await this.authService.verifyPasswordResetCode(this.oobCode);
      this.form.patchValue({
        email: accountEmail
      });
    } catch {
      this.toastrService.error('O código de recuperação está inválido.', 'Erro!');
      this.router.navigateByUrl('/forgot-password', {
        replaceUrl: true
      });
    }
  }

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.mutation.mutate(this.form.value);
  }
}
