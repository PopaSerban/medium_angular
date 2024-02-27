import { createActionGroup, props } from "@ngrx/store";
import { ArticleInterface } from "../../shared/types/articles.interface";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export const createArticleActions = createActionGroup({
    source: 'create article',
    events: {
        'Create Article': props<{ request: ArticleRequestInterface }>(),
        'Create Article Success': props<{ article: ArticleInterface}>(),
        'Create Article Failure': props<{errors: BackendErrorsInterface}>(),
    }
})