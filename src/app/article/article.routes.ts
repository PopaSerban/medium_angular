import {Route} from '@angular/router';
import {ArticleComponent} from './components/article/article.component';
import { provideEffects } from '@ngrx/effects';
import * as articleEffets from './store/effects';
import { provideState } from '@ngrx/store';
import { articleFeatureKey, articleReducer } from './store/reducers';
import { ArticleService } from './services/article.service';

export const routes: Route[] = [
    {
        path: '',
        component: ArticleComponent,
        providers: [
            provideEffects([articleEffets]),
            provideState(articleFeatureKey, articleReducer),
            ArticleService
        ]
    }
];
