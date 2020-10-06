import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthServise} from "../app/services/auth.servise";
import {Observable} from "rxjs";
@Injectable()
export  class TokenInterceptor  implements HttpInterceptor{
  constructor(
    private auth: AuthServise
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if( this.auth.isLogin()){
      req = req.clone({
        setHeaders:{
          Authorization: this.auth.getToken()
        }
      })
    }

    return  next.handle(req)
  }

}
