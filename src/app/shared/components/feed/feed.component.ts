import {Component, Input, OnInit, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {feedActions} from './store/actions';
import {combineLatest} from 'rxjs';
import {selectError, selectFeedData, selectIsLoading} from './store/reducers';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ErrorMessageComponent} from '../errorMessage/error-message.component';
import {LoadingMessageComponent} from '../loadingMessage/loading-message.component';
import {environment} from '../../../../environments/environment';
import {PaginationComponent} from '../pagination/pagination.component';
import queryString  from 'query-string';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingMessageComponent,
    PaginationComponent,
  ],
})
export class FeedComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  @Input() apiUrl: string = '';
  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage = 0;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || 1);
        this.fetchFeed(); 
    });
  }
  fetchFeed() {
    const offset = this.currentPage  * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
        limit: this.limit, 
         offset,
        ...parsedUrl.query 
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}
