import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AddToFavoritesService } from './services/addToFavorites.service';
import {Component, Input, inject} from '@angular/core';
import { addToFavoritesActions } from './store/actions';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  private store = inject(Store)

  handleLike() {
    this.store.dispatch(addToFavoritesActions.addToFavorites(
      {isFavorited:this.isFavorited, slug: this.articleSlug}))
    if (this.isFavorited) {
      --this.favoritesCount;
    } else {
      ++this.favoritesCount;
    }
    this.isFavorited = !this.isFavorited;
  }
}
