import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import  {AuthServise } from "../../services/auth.servise";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  token = '';


  constructor(private auth: AuthServise,
              private router: Router) { }

  ngOnInit(): void {
    this.token = this.auth.getToken()

    this.auth.isLogin()

  }

}
