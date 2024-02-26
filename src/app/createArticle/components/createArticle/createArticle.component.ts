import {Component} from '@angular/core';
import { ArticleFormValuesInterface } from '../../../shared/components/articleForm/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../../shared/components/articleForm/articleForm.component';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  imports: [ArticleFormComponent],
  standalone: true,
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    console.log('submit in create articles', articleFormValues);

  }
}
