import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IsLoadingDirective, emailValidator } from '@burand/angular';
import { errorTailorImports } from '@ngneat/error-tailor';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

import { fadeIn } from '@animations/fade-in';
import { InputComponent } from '@forms/input/input.component';
import { AuthService } from '@services/auth.service';

@Component({
  standalone: true,
  animations: [fadeIn],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, ReactiveFormsModule, InputComponent, IsLoadingDirective, errorTailorImports]
})
export class ForgotPasswordPage {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  submitted = signal(false);

  form = this.formBuilder.group({
    email: [null, [Validators.required, emailValidator]]
  });

  mutation = injectMutation<unknown, Error, typeof this.form.value>(() => ({
    mutationFn: async ({ email }) => {
      await this.authService.recoverPassword(email);
    },
    onSuccess: () => {
      this.toastrService.success('E-mail de recuperação enviado com sucesso!');
      this.submitted.set(true);
    },
    onError: () => {
      this.toastrService.error('Não foi possível enviar o e-mail de recuperação. Tente novamente.', 'Erro!');
    }
  }));

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.mutation.mutate(this.form.value);
  }
}
