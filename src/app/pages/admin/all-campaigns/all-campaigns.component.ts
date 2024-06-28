import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../services/campaign/campaign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrl: './all-campaigns.component.css'
})
export class AllCampaignsComponent implements OnInit{

  campaigns : any = []
  isApproved: boolean = true

    constructor(private _campaignService : CampaignService){}


    ngOnInit(): void {
        this._campaignService.allCampain().subscribe(
            (data)=>{
                this.campaigns = data
            },
            (error)=>{
                console.log(error)
                Swal.fire('Error','server error','error')

            
            }
        )
    }

    updateCampaign(i :any,status : any){
        this.campaigns[i].admin_status = status
        console.log(this.campaigns[i].admin_status)
        this._campaignService.updateCampaign(this.campaigns[i]).subscribe(
            (data)=>{
                Swal.fire("sucess","Completed","success")
            },

        )
    }


}
