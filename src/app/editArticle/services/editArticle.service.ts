import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {ArticleRequestInterface} from '../../shared/types/articleRequest.interface';
import {Observable, map} from 'rxjs';
import {ArticleInterface} from '../../shared/types/articles.interface';
import {environment} from '../../../environments/environment';
import {ArticleResponseInterface} from '../../shared/types/articleResponse.interface';

@Injectable()
export class EditArticleService {
  private http = inject(HttpClient);

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
