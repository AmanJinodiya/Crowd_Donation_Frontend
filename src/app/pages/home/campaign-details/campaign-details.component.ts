import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../services/campaign/campaign.service';
import Swal from 'sweetalert2';
import { DonationService } from '../../../services/donation/donation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent implements OnInit{
//    donations = [
//     { name: "John Doe", amount: 100, note: "Thank you for your support!" },
//     { name: "Jane Smith", amount: 50, note: "Keep up the great work!" },
//     { name: "Alice Johnson", amount: 200, note: "In memory of a loved one." },
//     { name: "Bob Brown", amount: 75, note: "Happy to contribute!" },
//     { name: "Emily Davis", amount: 30, note: "For a better future." }
// ];

campaign : any = {}
donation : any = []

highestDonar:any =  null
firstDonar:any =  null
secondDonar:any = null

collectedTillNow = 0

isPopupVisible = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  

constructor(private _campaignService : CampaignService, private _donationService : DonationService, private _route : ActivatedRoute,){}


  ngOnInit(): void {

    const id  =  this._route.snapshot.params['campaignId'];
    
    this._campaignService.campaignById(id).subscribe(
      (data)=>{
        this.campaign = data
        
      },
      (error)=>{
        console.log(error)
        Swal.fire('Error',"server error",'error')
      }
    )

    this._donationService.donationByCampaign(id).subscribe(
      (data:any)=>{
        this.donation = data

        if(this.donation.length > 1){
          this.firstDonar = data[0];
          this.secondDonar = data[1];
        }
        else if(data.length > 0) this.firstDonar = data[0];
        for(let i = 0;i < this.donation.length ; i++){
          this.collectedTillNow += this.donation[i].amount;
        }
        
        if (this.donation && this.donation.length > 0) {
          const maxDonor = this.donation.reduce((prev:any, current:any) => {
            return (prev.amount > current.amount) ? prev : current;
          });

          this.highestDonar = maxDonor;
          
          console.log('Donor with the maximum amount:', maxDonor);
        }
    

        console.log(data)
      },
      (error)=>{
        console.log(error)
        Swal.fire('Error',"server error",'error')
      }
    )

  }




}
