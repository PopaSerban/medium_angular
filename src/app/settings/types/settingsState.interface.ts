import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";

export interface SettingsStateInterface {
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null;
    // currentUser: CurrentUserInterface | null;
}