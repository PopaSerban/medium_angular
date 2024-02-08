import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {authActions} from './actions';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {AuthService} from '../services/auth.services';
import {HttpErrorResponse} from '@angular/common/http';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.registerSuccess({currentUser});
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: error.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);
