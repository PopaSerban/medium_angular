import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class FeedService {
    private http = inject(HttpClient);

    getFeed(url: string) : Observable<GetFeedResponseInterface>{
        const fullUrl = environment.apiUrl + url;
        return this.http.get<GetFeedResponseInterface>(fullUrl);
    }
}