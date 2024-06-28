import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../../services/donation/donation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent implements OnInit {


  donations:any = []

  constructor(private _donationService : DonationService){}


  ngOnInit(): void {
    
    this._donationService.allDonation().subscribe(
      (data)=>{
        this.donations = data
        // console.log(data)

    },
    (error)=>{
        console.log(error)
        Swal.fire('Error','server error','error')

    
    }
    )

    this._donationService.donationByMonth().subscribe(
      (data)=>{
        // this.donations = data
        console.log(data)

    },
    (error)=>{
        console.log(error)
        Swal.fire('Error','server error','error')

    
    }
    )



    




}
}
