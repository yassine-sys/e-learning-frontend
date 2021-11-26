import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/user-profile/user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BusinessUnit } from './business-unit.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userClaims: any;
 

  constructor(private router: Router, private userService: UserService,private route:ActivatedRoute,private http:HttpClient) { }
  businessunits:any;

  business_unit:any=[];

 

  ngOnInit() {
    
   
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
//console.log(data)

//this.Id=this.userService.user.Id
//this.list()
    });

   
this.list()

  }

  displayedColumns: string[] = ['BusinessUnitId', 'Name', 'Description'];
  dataSource = new MatTableDataSource<BusinessUnit>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  businessunitlist(): Observable<Array<BusinessUnit>>{
    return this.http.get<Array<BusinessUnit>>('https://localhost:44306/api/BusinessUnits')
     
   }

   list(){
    this.businessunitlist().subscribe((data: any) => {
      this.dataSource.data=data as BusinessUnit[]
      this.dataSource.sort=this.sort
      this.dataSource.paginator=this.paginator
      
      //console.log(data);
    });

  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user-profile']);
  }
  businessunit(){
    this.router.navigate(['/business_unit']);
  }

 
 
}
