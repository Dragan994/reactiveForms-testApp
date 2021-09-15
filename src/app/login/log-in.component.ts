import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomValidatorService } from '../shared/custom-validator.service';
import { DialogOverviewComponent } from '../shared/dialog/dialog-overview/dialog-overview.component';
import { ServerService } from '../shared/server.service';
import { IUser } from '../user-profile/user.interface';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  title:string = 'Log In';
  button:string = 'Log In';
  loginForm!: FormGroup ;
  user!: IUser | any

  constructor(private formBuilder: FormBuilder,
              private customValidator: CustomValidatorService,
              private serverService: ServerService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, this.customValidator.password(['@','!'], 4)]]
    })
  }

  submit(){
    this.serverService.loginUser(this.loginForm.value).subscribe(
      response=> {
        const userData:IUser | any = {...response}
        const errorMessages = userData.message
        if(errorMessages == "User does not exist!") {
          this.loginForm.get('email')?.setErrors({wrongEmail: true})
        }
        if(errorMessages == "Wrong password!") {
          this.loginForm.get('password')?.setErrors({wrongPassword: true})

        }
        else{
          this.openDialog(response)
        }
        
        this.serverService.setUserId(userData.id)
      }
      )
  }



  openDialog(data) {
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
          width: '300px',
          data: data
        });
  }


}
