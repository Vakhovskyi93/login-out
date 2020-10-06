import {Component, OnInit} from '@angular/core';
import { AuthServise } from "./services/auth.servise";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthServise) {

  }
  ngOnInit() {
    const token = localStorage.getItem('auth-token')

    if ( token !== null ) {
      this.auth.setToken(token)
    }
  }
}
