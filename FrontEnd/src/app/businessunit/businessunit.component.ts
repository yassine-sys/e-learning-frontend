import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessUnit } from 'app/home/business-unit.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-businessunit',
  templateUrl: './businessunit.component.html',
  styleUrls: ['./businessunit.component.css']
})
export class BusinessunitComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }
  businessunits:any;

  business_unit:any=[];
  ngOnInit() {
    this.list()
  }

  displayedColumns: string[] = ['BusinessUnitId', 'Name', 'Description','onSelect'];
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
      
     // console.log(data);
    });

  }
  onSelect(businessunit){
    this.router.navigate(['/business_unit',businessunit.BusinessUnitId])

  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user-profile']);
  }
}
