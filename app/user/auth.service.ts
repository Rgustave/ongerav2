



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http, Headers, Response,RequestOptions} from '@angular/http';
import{IUser} from './user.model'

@Injectable()
export class AuthService {
    public token: string;
     currentUser:IUser
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    loginUser(user:any): Observable<boolean> {
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers:headers})
        return this.http.post('https://ongera-api.herokuapp.com/bk/login', JSON.stringify(user),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
               
                    let token = response.json() && response.json().access_token ;
                    let responseJSON = response.json()
                            
                if ( response.status === 201) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: responseJSON.user.username, token: token }));
                    return response.json()
                } 
            }).catch(this.handleError)
    }
 
    logoutUser(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

      private handleError(error: Response) {
       return Observable.throw(error.json() || 'Server error'); 
    }
}