import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RaiseCampaignComponent } from './pages/home/raise-campaign/raise-campaign.component';
import { HomeDashboardComponent } from './pages/home/home-dashboard/home-dashboard.component';
import { TransactionComponent } from './pages/home/transaction/transaction.component';
import { ShowCampaignComponent } from './pages/home/show-campaign/show-campaign.component';
import { CampaignDetailsComponent } from './pages/home/campaign-details/campaign-details.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { MyCampaignComponent } from './pages/home/my-campaign/my-campaign.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { DonationsComponent } from './pages/admin/donations/donations.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { AllCampaignsComponent } from './pages/admin/all-campaigns/all-campaigns.component';
import { AdashComponent } from './pages/admin/adash/adash.component';
import { HomepageComponent } from './pages/home/homepage/homepage.component';
import { AdminGuard } from './services/guards/admin-guard.guard';
import { userGuard } from './services/guards/user.guard';

const routes: Routes = [

  {
    path : "",
    component:HomepageComponent,
    pathMatch:'full'
  },
  {
    path : "login",
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path : "home",
    component:HomeComponent,
    
    canActivate : [userGuard],
    children: [
      {
        path : "",
        component:HomeDashboardComponent,
        
      },
      {
        path : "raiseCampaign",
        component:RaiseCampaignComponent,
        
      },
      {
        path: "pag",
        component: HomepageComponent
      },
      {
        path : "transaction/:campaignId",
        component:TransactionComponent,
        
      },
      {
        path : "showCampaign",
        component:ShowCampaignComponent,

        
      },
      {
        path : "campaignDetail/:campaignId",
        component:CampaignDetailsComponent,
        
      },
      {
        path : "profile",
        component:ProfileComponent,
        
      },
      {
        path : "myCampaign",
        component:MyCampaignComponent,
        
      },
    ]
  },

  {
    path:"admin",
    component: AdminComponent,
    canActivate : [AdminGuard],
    children : [
      {
        path:"",
        component:AdminDashboardComponent
      },
      {
        path:"dash",
        component:AdashComponent
      },

      {
        path : "showCampaign",
        component:AllCampaignsComponent,
        
      },
      {
        path : "allDonation",
        component:DonationsComponent,
        
      },
      {
        path : "allUsers",
        component:UsersComponent,
        
      },
      
      {
        path : "profile",
        component:ProfileComponent,
        
      },
    ]
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
