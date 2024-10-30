import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IsLoadingDirective, emailValidator } from '@burand/angular';
import { errorTailorImports } from '@ngneat/error-tailor';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

import { InputPasswordComponent } from '@forms/input-password/input-password.component';
import { InputComponent } from '@forms/input/input.component';
import { AuthService } from '@services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputComponent,
    InputPasswordComponent,
    IsLoadingDirective,
    errorTailorImports
  ]
})
export class LoginPage {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private authService = inject(AuthService);

  form = this.formBuilder.group({
    email: [null, [Validators.required, emailValidator]],
    password: [null, Validators.required]
  });

  mutation = injectMutation<unknown, Error, typeof this.form.value>(() => ({
    mutationFn: async ({ email, password }) => {
      await this.authService.signin(email, password);
    },
    onSuccess: () => {
      this.router.navigateByUrl('/dashboard', {
        replaceUrl: true
      });
    },
    onError: () => {
      this.toastrService.error('O e-mail ou senha está inválido.', 'Erro!');
    }
  }));

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.mutation.mutate(this.form.value);
  }
}
