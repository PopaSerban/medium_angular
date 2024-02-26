import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../shared/types/articles.interface";

export const articleActions = createActionGroup({
    source: 'article',
    events: {
        'Get Article': props<{ slug: string }>(),
        'Get Article Success': props<{ article: ArticleInterface}>(),
        'Get Article Failure': emptyProps(),
    }
})