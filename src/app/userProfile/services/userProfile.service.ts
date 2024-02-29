import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { UserProfileInterface } from "../types/userProfile.interface";
import { environment } from "../../../environments/environment";
import { GetUserProfileResponseInterface } from "../types/getUserProfileResponse.interface";

@Injectable()
export class UserProfileService{
    private http = inject(HttpClient);

    getUserProfile(slug: string):Observable<UserProfileInterface>{
        const url =`${environment.apiUrl}/profiles/${slug}`;
        return this.http.get<GetUserProfileResponseInterface>(url).pipe(
            map((response: GetUserProfileResponseInterface)=> response.profile)
        )
    }
}