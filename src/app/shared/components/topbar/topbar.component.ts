import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { combineLatest } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "mc-topbar",
    templateUrl: "./topbar.component.html",
    imports: [CommonModule, RouterLink],
    standalone: true,
})
export class TopbarComponent {
    private store = inject(Store);

    data$ =  combineLatest({
        currentUser: this.store.select(selectCurrentUser),
    })
}