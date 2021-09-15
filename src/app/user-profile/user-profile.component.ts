import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  title:string = 'User Profile'
  constructor(private serverService: ServerService) { }
  userData: any
  errorMessage!: '';

  ngOnInit(): void {
    this.serverService.getUser()
    .subscribe( data=>{ 
      this.userData = data
    })
  }

  
  
}
