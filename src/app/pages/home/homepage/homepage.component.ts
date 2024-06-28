
import { AfterViewInit, Component, ElementRef, EnvironmentInjector, HostListener, OnInit, ViewChild } from '@angular/core';
import { DonationService } from '../../../services/donation/donation.service';
import { CampaignService } from '../../../services/campaign/campaign.service';
import {NgsRevealModule} from 'ngx-scrollreveal';
import { UserService } from '../../../services/user/user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit,AfterViewInit {


  totaldonation: any = 0
  highestMonthly: any = 0
  totalCampaign: any = 0
  activeCampaign: any = 0
  onceAnimation: boolean = false;
  donateamount = 100
  campaigns: any = [
  ]

  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef;

  @ViewChild('numElement') numElement!: ElementRef;
  @ViewChild('numElement1') numElement1!: ElementRef;
  @ViewChild('numElement2') numElement2!: ElementRef;
  @ViewChild('numElement3') numElement3!: ElementRef;

  donateAmountupdate(v:any){
    this.donateamount = v
  }

  
  


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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    // Throttle the listener with a 15% chance
    if (Math.random() < 0.15) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (scrollTop > 600 && !this.onceAnimation) {
        this.numberAnimation(this.totaldonation,this.numElement);
        this.numberAnimation(this.highestMonthly,this.numElement1);
        this.numberAnimation(this.activeCampaign,this.numElement2);
        this.numberAnimation(this.activeCampaign,this.numElement3);
        this.onceAnimation = !this.onceAnimation
      }
    }
  }


  constructor(private donationService: DonationService, private campaignService: CampaignService,private userService : UserService) { }
  

  login(){
    window.location.href = '/login'
  }


  // constructor(private userService : UserService){}
  ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.muted = true;
  }
  ngOnInit(): void {
   
    this.donationService.donationByMonth().subscribe(

      (data) => {
        for (let i = 0; i < 12; i++) {

          this.totaldonation += data[i]
          if (this.highestMonthly < data[i]) this.highestMonthly = data[i]
        }
      })

      this.campaignService.allCampain().subscribe(
        (data : any)=>{
          this.campaigns = data.slice(0,6);
          this.totalCampaign = data.length;
        }
      )
      this.campaignService.campaignActive().subscribe(
        (data : any)=>{
          this.activeCampaign = data;
        }
      )

  }

}
