import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from '../helper';
import { __makeTemplateObject } from 'tslib';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http : HttpClient) { }

  allCampain(){
    return this.http.get(`${baseurl}/campaign/`);
  }

  addCampaign(campaignData : any){
    return this.http.post(`${baseurl}/campaign/`,campaignData)
  }
  
  updateCampaign(campaignData : any){
    return this.http.put(`${baseurl}/campaign/`,campaignData)
  }

  campaignById(id : any){
    return this.http.get(`${baseurl}/campaign/${id}`);

  }

  campaignByUser(id:any){
    return this.http.get(`${baseurl}/campaign/user/${id}`)
  }

  campaignActive(){
    return  this.http.get(`${baseurl}/campaign/active/`);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file);

    return this.http.post(`${baseurl}/file/upload/`, formData, { observe: 'response' }).pipe(
      map((event: HttpResponse<any>) => event.body),
      catchError(this.handleError)
    );

    

    // return this.http.post(`${baseurl}/file/upload/`, formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // }).pipe(
    //   map(event => {
    //     switch (event.type) {
    //       case HttpEventType.UploadProgress:
    //         const progress = Math.round(100 * event.loaded / (event.total ?? 1));
    //         return { status: 'progress', message: progress };
    //       case HttpEventType.Response:
    //         return { status: 'success', message: event.body };
    //       default:
    //         return `Unhandled event: ${event.type}`;
    //     }
    //   }),
    // );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  

}
