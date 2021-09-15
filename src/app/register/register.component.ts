import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidatorService } from '../shared/custom-validator.service';
import { debounceTime } from 'rxjs/operators';
import { ServerService } from '../shared/server.service';
import { v4 as uuid } from 'uuid';
import { DialogOverviewComponent } from '../shared/dialog/dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title:string = 'Register'
  userForm!: FormGroup;
  emailMatch: boolean=  true
  user!: any

  constructor(  private formBuilder: FormBuilder,
                private customValidator: CustomValidatorService,
                private serverService: ServerService,
                public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['',[Validators.required, Validators.minLength(3)]],
      lastName: ['',[Validators.required, Validators.maxLength(25)]],

      emailGroup: this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        confirmEmail: ['',[Validators.required, Validators.email]]
      }, {validator: this.customValidator.checkMatch('email', 'confirmEmail')}),

      passwordGroup: this.formBuilder.group({
        password: ['',[Validators.required, this.customValidator.password(['@','!'], 4)]],
        confirmPassword:['',[Validators.required, this.customValidator.password(['@','!'], 4)]]
      }, {validator: this.customValidator.checkMatch('password', 'confirmPassword')})
    })


    this.userForm.valueChanges.pipe(debounceTime(1000)).subscribe(      
      () => { this.setErrors()}
    )
  }

  submit(){
    const registerData = {
      id: uuid(),
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('emailGroup.email')?.value,
      password: this.userForm.get('passwordGroup.password')?.value
    }
    this.serverService.registerUser(registerData).subscribe(response=>console.log(response))
    this.serverService.setUserId(registerData.id)
    this.user = registerData
    this.openDialog()
  }

  setErrors(): void {
    if(this.userForm.get('emailGroup')?.errors !== null) {
      this.userForm.get('emailGroup.confirmEmail')?.setErrors({match: true})
    }
    
    if(this.userForm.get('passwordGroup')?.errors !== null) {
      this.userForm.get('passwordGroup.confirmPassword')?.setErrors({match: true})
    }

}

openDialog() {
  const dialogRef = this.dialog.open(DialogOverviewComponent, {
    width: '300px',
    data: this.user
  });
}
}
