import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { LoginResponseDTO } from "../../../../../../common/dto/login-response.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'brvns-repertory-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    public currentUser: LoginResponseDTO;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
      this.authService.currentUser.subscribe(x => {
          this.currentUser = x;
      });
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
