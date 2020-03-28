import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'brvns-repertory-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private notificationService: NotificationService, private _snackBar: MatSnackBar) {
      this.notificationService.notification$.subscribe(message => {
          this._snackBar.open(message, 'Закрыть', {
              duration: 5000,
          });
      });
  }
}
