import { CommonModule } from '@angular/common';
import {Component, Input} from '@angular/core';

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

  handleLike() {
    if (this.isFavorited) {
      --this.favoritesCount;
    } else {
      ++this.favoritesCount;
    }
    this.isFavorited = !this.isFavorited;
  }
}
