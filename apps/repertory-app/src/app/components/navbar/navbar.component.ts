import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { LoginResponseDTO } from "../../../../../../common/dto/login-response.dto";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";

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
        private notificationService: NotificationService,
    ) {
      this.authService.currentUser.subscribe(x => {
          this.currentUser = x;
      });
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
        this.notificationService.notification$.next('Вы вышли из аккаунта');
    }
}
