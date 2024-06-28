import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  activeLink: boolean[] = [true, false, false, false, false];

  constructor(private router: Router, private userService: UserService) {
    // Subscribe to router events to update the active link
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink();
      }
    });
  }

  ngOnInit() {
    this.updateActiveLink();
  }

  updateActiveLink() {
    const url = this.router.url;
    this.activeLink = [
      url === '/admin',
      url === '/admin/showCampaign',
      url === '/admin/allDonation',
      url === '/admin/allUsers',
      url === '/admin/profile'
    ];
  }

  logout() {
    this.userService.logOut();
    window.location.href = '/';
  }
}
