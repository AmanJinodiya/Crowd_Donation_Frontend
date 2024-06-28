import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeNavbarComponent } from './pages/home/home-navbar/home-navbar.component';
import { RaiseCampaignComponent } from './pages/home/raise-campaign/raise-campaign.component';
import { HomeDashboardComponent } from './pages/home/home-dashboard/home-dashboard.component';
import { TransactionComponent } from './pages/home/transaction/transaction.component';
import { ShowCampaignComponent } from './pages/home/show-campaign/show-campaign.component';
import { CampaignDetailsComponent } from './pages/home/campaign-details/campaign-details.component';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from './pages/home/profile/profile.component';
import { MyCampaignComponent } from './pages/home/my-campaign/my-campaign.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './pages/admin/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DonationsComponent } from './pages/admin/donations/donations.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { AllCampaignsComponent } from './pages/admin/all-campaigns/all-campaigns.component';
import { authInterceptorProviders } from './services/auth-interceptor.interceptor';
import { AdashComponent } from './pages/admin/adash/adash.component';
import { HomepageComponent } from './pages/home/homepage/homepage.component';

import { CarouselModule } from 'primeng/carousel'; 
import { ButtonModule } from 'primeng/button'; 
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfettiButtonComponent } from './confetti-button/confetti-button.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    HomeNavbarComponent,
    RaiseCampaignComponent,
    HomeDashboardComponent,
    TransactionComponent,
    ShowCampaignComponent,
    CampaignDetailsComponent,
    ProfileComponent,
    MyCampaignComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    DonationsComponent,
    UsersComponent,
    AllCampaignsComponent,
    AdashComponent,
    HomepageComponent,
    ConfettiButtonComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CanvasJSAngularChartsModule,
    CarouselModule,
    ButtonModule,
    ImageModule,
    TableModule,
    TagModule
  ],
  providers: [
    provideClientHydration(),
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
