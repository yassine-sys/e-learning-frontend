import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/user-profile/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userClaims: any;

  constructor(private router: Router, private userService: UserService,private route:ActivatedRoute) { }

  ngOnInit() {
   
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
console.log(data.Id)
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user-profile']);
  }
}
