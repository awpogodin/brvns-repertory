import {Component, Input} from "@angular/core";

@Component({
  selector: 'brvns-repertory-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
    @Input() title: string;
}
