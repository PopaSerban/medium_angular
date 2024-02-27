import { ArticleInterface } from "../../shared/types/articles.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export interface EditrticleStateInterface {
    article: ArticleInterface | null;
    isLoading: boolean;
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null;
}