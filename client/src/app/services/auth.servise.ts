import { Injectable } from "@angular/core";
import { User } from "../interfaces/interface";
import { HttpClient  } from '@angular/common/http';
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable( )
export class AuthServise {

  private token = null;
  url = "http://localhost:5000";
  constructor(
    public http: HttpClient,
    private router: Router
     ) {

  }


  register(user:User): Observable<any> {
    return this.http.post(`${this.url}/api/auth/register`, user )
      .pipe(
        tap(
          (i) => {
            localStorage.setItem('auth-token', i.token)
            this.setToken( i.token )

          })
      )


  }
  login( user:User): Observable<{ token: string }>{

    return this.http.post<{ token: string }>(`${this.url}/api/auth/login`, user )
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken( token )

        })
      )

  }
  setToken( token: string){
    this.token = token

  }
  getToken(  ){
    return localStorage.getItem('auth-token')


  }
  isLogin(  ) : boolean{

    return !!this.token
  }


  getUsers(){
    return this.http.post(`${this.url}/api/auth/users`, {})
      .pipe(
        tap( i => {
           return i
        })
      )
  }


  logOut() {
    this.setToken(null)
    localStorage.removeItem('auth-token')
    this.router.navigate(['/login'])
  }

}
