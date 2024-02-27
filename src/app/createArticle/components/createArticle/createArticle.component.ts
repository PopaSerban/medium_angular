import {Component, inject} from '@angular/core';
import {ArticleFormValuesInterface} from '../../../shared/components/articleForm/types/articleFormValues.interface';
import {ArticleFormComponent} from '../../../shared/components/articleForm/articleForm.component';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  imports: [ArticleFormComponent, CommonModule],
  standalone: true,
})
export class CreateArticleComponent {
  private store = inject(Store);

  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  });

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const request: ArticleRequestInterface = {
        article: articleFormValues
    }
    this.store.dispatch(createArticleActions.createArticle({request}));
  }
}
