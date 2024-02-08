import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {selectIsSubmitting} from '../../store/reducers';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  isSubmitting$ = this.store.select(selectIsSubmitting);
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
