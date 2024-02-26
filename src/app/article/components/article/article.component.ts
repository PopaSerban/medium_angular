import {Component, OnInit, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {articleActions} from '../../store/actions';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {combineLatest, filter, map} from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { LoadingMessageComponent } from "../../../shared/components/loadingMessage/loading-message.component";
import { ErrorMessageComponent } from "../../../shared/components/errorMessage/error-message.component";
import { TagListComponent } from "../../../shared/components/tagList/tag-list.component";

@Component({
    selector: 'mac-article',
    templateUrl: './article.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, LoadingMessageComponent, ErrorMessageComponent, TagListComponent]
})
export class ArticleComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== null
        )
      ),
  }).pipe(
    map(({article, currentUser}) => {
      if (!article || !currentUser) return false;
      return article?.author.username === currentUser?.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$
  });

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));
  }
}
