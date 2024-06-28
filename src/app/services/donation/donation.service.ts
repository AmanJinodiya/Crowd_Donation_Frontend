import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http : HttpClient) { }


  allDonation(){
    return this.http.get(`${baseurl}/donation/`);
  }

  addDonation(donationData : any){
    return this.http.post(`${baseurl}/donation/`,donationData)
  }

  donationByCampaign(id : any){
    return this.http.get(`${baseurl}/donation/campaign/${id}`);
  }
  
  donationByMonth(){
    return this.http.get<any[]>(`${baseurl}/donation/month/`);
  }
  
}
