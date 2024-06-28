import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../services/campaign/campaign.service';

import Swal from 'sweetalert2';

import { WindowRefService } from '../../../window-ref.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-raise-campaign',
  templateUrl: './raise-campaign.component.html',
  styleUrl: './raise-campaign.component.css',
  
  providers: [WindowRefService]
})
export class RaiseCampaignComponent implements OnInit{

  user:any
  uploadResponse:any

  filename: any

  campaingData : any = {
    tittle:'',
    description : '',
    goal_amount : '',
    start_date : '',
    end_date : '',
    active_status : '',
    image: null,
    story:'',
    tag:'',
    user: {
      userId: 5
    }
  };

  

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.campaingData.image = input.files[0];
    this.filename = input.files[0].name;

    console.log(this.filename)
  }
}

  constructor(private _campaignService : CampaignService,private userService : UserService){}
  ngOnInit(): void {

    this.user = this.userService.getUser();
    this.campaingData.user.userId = this.user.userId

    this.campaingData.user.userId = this.userService.getUser().userId;
   
    

  }
  

  uploadImage() {


    if (this.campaingData.tittle == '' || this.campaingData.description == '' || this.campaingData.start_date == ''
      || this.campaingData.end_date == '' || this.campaingData.story == '' || this.campaingData.image == null || this.campaingData.tag == ''
    ) {
      alert('Fill all fields.');
      return;
    }

    if (this.campaingData.image) {
      this._campaignService.uploadFile(this.campaingData.image).subscribe(
        (response) =>{
          this.uploadResponse = "http://localhost:8080/images/" + response.url;
          this.campaingData.image = this.uploadResponse

          this.addCampaign();
        },
        (error) => this.uploadResponse = `File upload failed: ${error}`
      );
    } else {
      console.log('No file selected.');
    }
  }

  
    // Handle other form data submission logic here
  



  addCampaign(){

    this._campaignService.addCampaign(this.campaingData).subscribe(
      (data)=>{
        
        Swal.fire("Successfully",'Added Campagin','success')
        window.location.href = "/home/showCampaign"
      },
      (error)=>{
        console.log(error)
        Swal.fire('Error',"server error",'error')
      }
    )
  }



}
