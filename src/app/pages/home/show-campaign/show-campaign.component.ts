import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../../../services/campaign/campaign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-campaign',
  templateUrl: './show-campaign.component.html',
  styleUrl: './show-campaign.component.css'
})
export class ShowCampaignComponent implements OnInit,AfterViewInit{



    campaigns : any = []
    @ViewChild('videoPlayer')
    videoPlayer!: ElementRef;

    constructor(private _campaignService : CampaignService){}

    ngAfterViewInit(): void {
        const video: HTMLVideoElement = this.videoPlayer.nativeElement;
        video.muted = true;
      }


    ngOnInit(): void {
        this._campaignService.allCampain().subscribe(
            (data:any)=>{
                // this.campaigns = data
                this.campaigns = data.filter((campaign: any) => campaign.admin_status === true);
                // console.log(data)
            },
            (error)=>{
                console.log(error)
                Swal.fire('Error','server error','error')

            
            }
        )
    }




}
