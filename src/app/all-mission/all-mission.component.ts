import { Component, OnInit, ViewChild } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { mission } from '../models/mission';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material' ; 
import {MatTableModule} from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { CdkTableModule } from '@angular/cdk/table';
import {MatPaginator} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-mission',
  templateUrl: './all-mission.component.html',
  styleUrls: ['./all-mission.component.css']
})
export class AllMissionComponent implements OnInit {

  missions : mission[] ; 
  totalRec : number;
  page: number = 1;
  listData : MatTableDataSource<any> ; 
  readonly url = 'http://localhost:8080/api/mission/listmission'
  constructor(private missionService : MissionService , 
    private http : HttpClient , 
    private router : Router) { }
 
  goToMission(){
    this.router.navigateByUrl('/mission');
    }

 
  
  loadMissions()
  {this.missionService.getMissions(this.cod).subscribe(
   list => { 
     console.log('missions loading') ; 
     this.missions=list ;
     this.totalRec = this.missions.length;

    },
    error => {console.log(error) } , 
    () => {console.log('loading missions was done ');}
  ) ; 
  
}

 // displayedColumns: string[] = ['code_mission', 'objetA', 'objetF', 'code'];

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //dataSource = new MatTableDataSource<any>(this.missions);
  cod : String ; 
  ngOnInit() {
   // console.log(this.dataSource) ; 
   // this.dataSource.paginator = this.paginator;
   var DeptGenVal = localStorage.getItem('deptGen') ; 
   var data = JSON.parse(DeptGenVal) ; 
   console.log('retrievedObject: ',data.code) ;
   this.cod=data.code ;
   this.loadMissions() ;

  }

}
