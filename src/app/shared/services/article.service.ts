import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "../types/articles.interface";
import { environment } from "../../../environments/environment";
import { ArticleResponseInterface } from "../types/articleResponse.interface";

@Injectable({
    providedIn: 'root',
})
export class ArticleService{
    private http = inject(HttpClient);

    getArticle(slug: string): Observable<ArticleInterface>{
        const fullUrl = `${environment.apiUrl}/articles/${slug}`
        return this.http.get<ArticleResponseInterface>(fullUrl).pipe(
            map((response: ArticleResponseInterface) => response.article)
        );
    }
}