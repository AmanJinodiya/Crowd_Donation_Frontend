import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DonationService } from '../../../services/donation/donation.service';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  
})
export class AdminDashboardComponent implements OnInit{

  constructor(private donationService : DonationService,private campaignService : CampaignService,private userService : UserService){}

  monthlyData : any = [
  ]
  month: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  chartOptions = {}
  chartOptions1 = {}

  name: String = "Sam Alter"

  donations:any = [
    {},{},{},{},{},{},{},{},{},{},{},{},
  ]

  tagarray:any = [0,0,0,0,0]

  totaldonation: any = 0
  highestMonthly : any = 0
  totalCampaign : any = 0
  activeCampaign: any = 0

  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef;

  @ViewChild('numElement') numElement!: ElementRef;
  @ViewChild('numElement1') numElement1!: ElementRef;
  @ViewChild('numElement2') numElement2!: ElementRef;
  @ViewChild('numElement3') numElement3!: ElementRef;

  numberAnimation(endValue: number, numElement: ElementRef) {
    let startValue = 0;
    let duration = 2000; // total duration in milliseconds
    let increment = endValue / duration * 10; // higher increment for faster updates

    let updateCounter = () => {
      startValue += increment;
      if (startValue >= endValue) {
        startValue = endValue;
        numElement.nativeElement.textContent = Math.floor(startValue).toString();
      } else {
        numElement.nativeElement.textContent = Math.floor(startValue).toString();
        setTimeout(updateCounter, 10); // update every 10 milliseconds
      }
    };

    updateCounter();
  }

  onceAnimation:boolean = false;
  



  ngOnInit(): void {

    this.name = this.userService.getUser().name;

    this.donationService.donationByMonth().subscribe(

      (data)=>{
        for(let i = 0;i < 12 ;i++){
          this.monthlyData.push({ label: this.month[i], y: data[i] ,x : i});
          this.totaldonation += data[i]
          if(this.highestMonthly < data[i]) this.highestMonthly = data[i]
        }

        console.log(this.monthlyData)


        this.chartOptions = {
          title: {
            text: 'Monthly Sales Data',
          },
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          axisY: {
            includeZero: true,
            valueFormatString: '$#k',
          },
          data: [
            {
              type: 'line', // changed from 'column' to 'line'
              yValueFormatString: '$#,##0k',
              color: '#01b8aa',
              dataPoints: this.monthlyData,
            },
          ],
        };
        


       
      
      },
      (error)=>{
        console.log(error)
      }


    )

    this.campaignService.allCampain().subscribe(
      (data : any)=>{
        this.totalCampaign = data.length;
        console.log(data)
        for(let i = 0;i < data.length;i++){
          if(data[i].tag == 'medical') this.tagarray[0]++;
          if(data[i].tag == 'food') this.tagarray[1]++;
          if(data[i].tag == 'clothes') this.tagarray[2]++;
          if(data[i].tag == 'education') this.tagarray[3]++;
          if(data[i].tag == 'others') this.tagarray[4]++;
          
        }

        console.log(this.tagarray)
      }
    )
    this.campaignService.campaignActive().subscribe(
      (data : any)=>{
        this.activeCampaign = data;
      }
    )


    this.donationService.allDonation().subscribe(
      (data:any)=>{
        this.donations = data.slice(0,7);
      }
    )

    

  }

  temp(){
    this.monthlyData = [
      { x: new Date(2023, 0), y: 60 },
      { x: new Date(2023, 1), y: 40 },
      { x: new Date(2023, 2), y: 80 },
      { x: new Date(2023, 3), y: 20 },
      { x: new Date(2023, 4), y: 100 },
      { x: new Date(2023, 5), y: 50 },
      { x: new Date(2023, 6), y: 90 },
      { x: new Date(2023, 7), y: 30 },
      { x: new Date(2023, 8), y: 70 },
      { x: new Date(2023, 9), y: 10 },
      { x: new Date(2023, 10), y: 80 },
      { x: new Date(2023, 11), y: 40 },
    ];
  }
  
  
  
}
