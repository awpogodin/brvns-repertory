import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../services/rest-api.service";
import { UserDTO } from "../../../../../../common/dto/user.dto";

@Component({
    selector: "brvns-repertory-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    public loading = true;
    public currentUser: UserDTO;

    constructor(private restApiService: RestApiService) {}

    ngOnInit(): void {
        this.restApiService.getCurrentUser().subscribe((user) => {
            this.currentUser = user;
            this.loading = false;
        });
    }
}
