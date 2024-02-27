import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {ArticleRequestInterface} from '../../shared/types/articleRequest.interface';
import {Observable, map} from 'rxjs';
import {ArticleInterface} from '../../shared/types/articles.interface';
import {environment} from '../../../environments/environment';
import {ArticleResponseInterface} from '../../shared/types/articleResponse.interface';

@Injectable()
export class CreateArticleService {
  private http = inject(HttpClient);

  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';

    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
