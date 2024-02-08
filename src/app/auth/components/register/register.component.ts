import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";

@Component({
    selector: 'mc-register',
    standalone: true,
    templateUrl: './register.component.html',
    imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backEndError: this.store.select(selectValidationErrors),
  })

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });

  onSubmit() {
    console.log('Form submitted', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({request}));
  }
}
