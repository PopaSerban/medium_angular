import { Component, Input, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectFeedData, selectIsLoading } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "../errorMessage/error-message.component";
import { LoadingMessageComponent } from "../loadingMessage/loading-message.component";

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, ErrorMessageComponent, LoadingMessageComponent]
})
export class FeedComponent implements OnInit{
    private store = inject(Store);
    @Input() apiUrl: string = "";

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        feed: this.store.select(selectFeedData),
    })
    ngOnInit(){
        this.store.dispatch(feedActions.getFeed({url: this.apiUrl}));
    }
}