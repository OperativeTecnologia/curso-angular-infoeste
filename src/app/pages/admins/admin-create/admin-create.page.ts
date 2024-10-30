import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError, IsLoadingDirective } from '@burand/angular';
import { errorTailorImports } from '@ngneat/error-tailor';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

import { InputComponent } from '@forms/input/input.component';
import { AdminRepository } from '@repositories/admin.repository';

@Component({
  standalone: true,
  selector: 'app-admin-create',
  templateUrl: './admin-create.page.html',
  imports: [errorTailorImports, IsLoadingDirective, ReactiveFormsModule, InputComponent]
})
export class AdminPage {
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private adminRepository = inject(AdminRepository);
  private router = inject(Router);

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  mutation = injectMutation<unknown, Error, typeof this.form.value>(() => ({
    mutationFn: async ({ email, name }) => {
      await this.adminRepository.add({
        email,
        name
      });
    },
    onSuccess: () => {
      this.toastrService.success('Administrador cadastrado com sucesso.');
      this.router.navigateByUrl('/admins');
    },
    onError: error => {
      const errorMessage = error instanceof ApiError ? error.message : 'Ocorreu um erro ao cadastrar usuário.';
      this.toastrService.error(errorMessage);
    }
  }));

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.mutation.mutate(this.form.value);
  }
}
