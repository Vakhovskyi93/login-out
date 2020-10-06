import { Component, OnInit, EventEmitter, Input , Output} from '@angular/core';
import { AuthServise } from "../../services/auth.servise";
import  { Router } from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  data
  constructor( private auth: AuthServise, private router: Router)  { }

  ngOnInit(): void {

      if( !this.auth.isLogin()) {

        this.router.navigate(['/login'])
      }
      this.auth.getUsers().subscribe((items:any)=>{
        this.data =  items.data;
      })
  }
  logout(){
    this.auth.logOut( )


  }

}
