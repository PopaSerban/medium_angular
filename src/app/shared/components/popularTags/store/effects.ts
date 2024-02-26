import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PopularTagService } from "../services/popularTag.service";
import { popularTagsAction } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { PopularTagType } from "../../../types/popularTag.type";

export const getPopularTagsEffect = createEffect(
    (actions$ = inject(Actions), popularTagsService = inject(PopularTagService)) => {
      return actions$.pipe(
        ofType(popularTagsAction.getPopularTags),
        switchMap(() => {
          return popularTagsService.getPopularTags().pipe(
            map((popularTags: PopularTagType[]) => {
              return popularTagsAction.getPopularTagsSuccess({popularTags})
            }),
            catchError(() => {
              return of(popularTagsAction.getPopularTagsFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )
  