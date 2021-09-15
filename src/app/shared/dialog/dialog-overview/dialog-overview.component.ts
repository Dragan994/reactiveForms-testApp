import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LogInComponent } from 'src/app/login/log-in.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html'
})
export class DialogOverviewComponent implements OnInit {

  
user!: string |any;
errMessage!: string;

  constructor( @Inject(MAT_DIALOG_DATA) public dataLogin: LogInComponent,
              public dialog: MatDialogRef<DialogOverviewComponent>,
              private router: Router) {}

  close(): void {
    this.dialog.close()
  }
  proceed(){
    this.router.navigate(['/user-profile']);
    this.dialog.close()
  }
  ngOnInit(): void {
    const data = {...this.dataLogin}
    this.user = data
    if(data['message']){
      this.errMessage = data['message']
    }
  }

  onWrongMail(){    
    this.dialog.close()
  }
}
