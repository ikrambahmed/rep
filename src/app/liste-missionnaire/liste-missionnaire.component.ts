import { Component, OnInit } from '@angular/core';
import { Missionnaire } from '../models/missionnaire';
import { MissionnaireService } from '../services/missionnaire.service';

@Component({
  selector: 'app-liste-missionnaire',
  templateUrl: './liste-missionnaire.component.html',
  styleUrls: ['./liste-missionnaire.component.css']
})
export class ListeMissionnaireComponent implements OnInit {
  cod : String ;
  missionnaires: Missionnaire[] ;
  searchText;


  operation: string ;
  selectedMissionnaire : Missionnaire ; 

  constructor(
  private missionnaireService : MissionnaireService
    ) { }

  ngOnInit() {
   this.initMiss() ;
   var DeptGenVal = localStorage.getItem('deptGen') ; 
   var data = JSON.parse(DeptGenVal) ; 
   console.log('retrievedObject: ',data.code) ;
   this.cod=data.code ;

 this.loadMissionaire() ; 
 }
  
  editOp()
  {
    this.operation='EDIT' ; 
  }
  removeOp()
  {
    this.operation="REMOVE" ; 
    
  }
 loadMissionaire()
  {this.missionnaireService.getMissionares(this.cod).subscribe(
    data => { this.missionnaires=data},
    error => {console.log('an error occured') } , 
    () => {console.log('loading missionnaires was done ')}
  )

  }
  initMiss()
{
  this.selectedMissionnaire= new Missionnaire() ; 
  
}}



