import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../../types/articles.interface";

export const addToFavoritesActions = createActionGroup({
    source: 'add to favorites',
    events: {
        'Add to favorites': props<{isFavorited: boolean, slug: string}>(),
        'Add to favorites success': props<{article: ArticleInterface}>(),
        'Add to favorites failure': emptyProps(),
    }
})