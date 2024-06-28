import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../services/campaign/campaign.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-my-campaign',
  templateUrl: './my-campaign.component.html',
  styleUrl: './my-campaign.component.css'
})
export class MyCampaignComponent implements OnInit{
 
  campaigns : any = []
  filteredCampaigns: any = []; 
  activeFilter: boolean | null = null;

    constructor(private _campaignService : CampaignService, private userService : UserService){}


    ngOnInit(): void {
        this._campaignService.campaignByUser(this.userService.getUser().userId).subscribe(
            (data)=>{
                this.campaigns = data
                this.filteredCampaigns = this.campaigns;
                console.log(data)
            },
            (error)=>{
                console.log(error)
                Swal.fire('Error','server error','error')

            
            }
        )


    }

    onFilterChange(value: boolean | null) {
        this.activeFilter = value;
        this.applyFilter();
    }


    applyFilter() {
        if (this.activeFilter === null) {
          this.filteredCampaigns = this.campaigns; // If no filter selected, show all campaigns
          
        } else {
          this.filteredCampaigns = this.campaigns.filter((campaign: any) => campaign.admin_status === this.activeFilter);
        }
        console.log(this.filteredCampaigns)
      }


}
