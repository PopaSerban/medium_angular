import { ArticleInterface } from "../../../types/articles.interface";

export interface GetFeedResponseInterface {
    articles:ArticleInterface[];
    articlesCount: number;

}