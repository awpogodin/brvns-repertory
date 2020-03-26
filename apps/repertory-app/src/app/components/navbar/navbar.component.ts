import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'brvns-repertory-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  public auth = true;

  ngOnInit(): void {
  }

}
