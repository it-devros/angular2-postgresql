﻿import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import 'rxjs/add/operator/map'
import { User } from '../_models/index'

@Injectable()
export class UserService {
  
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json())
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json())
  }

  create(user: User) {
    console.log('create')
    return this.http.post('http://localhost:3000/api/users', user).map((response: Response) => {
      let result = response.json()
      return result
    })
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json())
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json())
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token })
      return new RequestOptions({ headers: headers })
    }
  }
}