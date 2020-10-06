import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import  {AuthServise } from "../../services/auth.servise";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup
  aSub: Subscription

  constructor(
    private auth: AuthServise,
    private router: Router,
    public fleshMessege: FlashMessagesService

  ) { }

  ngOnInit(): void {
      this.form = new FormGroup( {
        email: new FormControl(null, [Validators.required, Validators.email ]),
        password: new FormControl( null, [Validators.required, Validators.minLength(6)] )
      })
  }
  ngOnDestroy(){
      if( this.aSub) {
        this.aSub.unsubscribe()
      }
  }
  onSubmit(){
      this.form.disable();
      this.aSub = this.auth.login(this.form.value).subscribe(
        () => { this.router.navigate(['/users'])
      } ,
     error => {

       this.fleshMessege.show( error.error.message, {
         cssClass: 'card-panel teal lighten-2',
         closeOnclick: true,
         timeOut: 10000
       })
       this.form.enable()
     })
  }
}
