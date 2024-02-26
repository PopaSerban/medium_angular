import {Component, OnInit, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {popularTagsAction} from './store/actions';
import {combineLatest} from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import {CommonModule} from '@angular/common';
import { LoadingMessageComponent } from "../loadingMessage/loading-message.component";
import { ErrorMessageComponent } from '../errorMessage/error-message.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popular-tags.component.html',
    standalone: true,
    imports: [CommonModule, LoadingMessageComponent, ErrorMessageComponent, RouterLink]
})
export class PopularTagsComponent implements OnInit {
  private store = inject(Store);

  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    this.store.dispatch(popularTagsAction.getPopularTags());
  }
}
