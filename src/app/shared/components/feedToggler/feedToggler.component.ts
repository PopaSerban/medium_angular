import { Component, Input, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'mc-feed-toggler',
    templateUrl: './feedToggler.component.html',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    standalone: true,
})
export class FeedTogglerComponent {
    @Input() tagName: string | null = null;

    private store = inject(Store);
    currentUser$ = this.store.select(selectCurrentUser);
}