import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import  {AuthServise } from "../../services/auth.servise";
import  { Router } from "@angular/router";
import {Subscription} from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup
  aSub: Subscription

  constructor(
    private auth: AuthServise,
    private router: Router,
    public fleshMessege: FlashMessagesService

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      name: new FormControl(null, [Validators.required,  Validators.minLength(4), Validators.maxLength(225)],  ),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(225) ]),
      password: new FormControl( null, [Validators.required, Validators.minLength(6), Validators.maxLength(225)] ),
      passwordrepit: new FormControl( null, [Validators.required, Validators.minLength(6), Validators.maxLength(225)] )
    })
  }
  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe()
    }

  }

  onSubmit() {
    this.form.disable();
    console.log(this.form.value)
    this.auth.register( this.form.value).subscribe(
      () => { this.router.navigate(['/users'])
      }

     ,
      error => {
        console.log(error.error)
        this.fleshMessege.show( error.error.message, {
          cssClass: 'card-panel teal lighten-2',
          closeOnclick: true,
          timeOut: 10000
        })

      })
    this.form.enable()

  }

}
