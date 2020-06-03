import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Department } from './department.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  public BusinessUnitId;

  constructor(private route:ActivatedRoute,private http:HttpClient,private router: Router) { }

  department:Department;
  departement:any=[];
  departments:any

  displayedColumns: string[] = ['DepartmentID', 'Name', 'Description'];
dataSource = new MatTableDataSource<Department>();
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.BusinessUnitId=this.route.snapshot.paramMap.get('id');
    this.list();

  }
  departmentlist(): Observable<Array<Department>>{
    return this.http.get<Array<Department>>('https://localhost:44306/api/DepartmentByBusinessUnit/'+this.BusinessUnitId)
  }
  list(){
    this.departmentlist().subscribe((data: any) => {
      this.dataSource.data = data as Department[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user-profile']);
  }

}
