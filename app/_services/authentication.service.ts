﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../_models/index';

@Injectable()
export class AuthenticationService {
    public user_temp: any;

    constructor(
        private http: Http
    ) { }
    login(user: User) {
        return this.http.post('http://localhost:3000/api/authenticate', user)
            .map((response: Response) => {
                console.log(response);
                let userdata = response.json();
                if (Object.keys(userdata).length == 0 ) {
                    return false;
                }
                else
                {
                    this.setUser(userdata);
                    localStorage.setItem('currentUser', response["_body"]);
                    return userdata;
                }
                
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    setUser(user_temp:any) {

        this.user_temp = user_temp;
    }

    getCurrentUser() {
        return this.user_temp;
    }

    
}