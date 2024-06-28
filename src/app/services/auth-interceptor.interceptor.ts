import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "./user/user.service";







@Injectable()
export class authInterceptorInterceptor implements HttpInterceptor{
    constructor(
        private loginService : UserService
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getToken();
        let authReq = req;
        if(token != null){
            // console.log(req)
            authReq = authReq.clone({setHeaders : {Authorization : `Bearer ${token}`}})
        }
        return next.handle(authReq);
    }
    
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : authInterceptorInterceptor,
        multi : true
    }

];