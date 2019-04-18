import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Projet } from '../models/Projet';
import { MissionService } from '../services/mission.service';
import { budget } from '../models/budget';

@Component({
  selector: 'app-budget-proj',
  templateUrl: './budget-proj.component.html',
  styleUrls: ['./budget-proj.component.css']
})
export class BudgetProjComponent implements OnInit {
  codeDept:String ; 
   y :String='' ;
   d:Date ; 
   dateSys : Date = new Date() ; 
   year : number ; 
   BudgetProjForm:FormGroup ;
   projets : Projet[] ; 
  constructor(private Fb:FormBuilder , private missionService:MissionService){
  this.createForm() ; 
  }
  createForm()
  {   
    this.BudgetProjForm = this.Fb.group({
      codPrj: ['',Validators.required],
      reference: ['',Validators.required],
      valeur :['',Validators.required],
      code : ['',Validators.required],
      dateBproj : ['',Validators.required]
    })}


  ngOnInit() {
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.code) ;
    this.codeDept=data.code ;

   this.d = new Date() ; 
   this.year= this.d.getFullYear() ;   
   this.y=this.year+"" ; 
   console.log(this.year.toString()) ; 
   console.log(this.y) ;
   this.loadProjet() ; 
   this.loadBudgets() ; 
  }
  budgets : budget[] ; 
    loadBudgets()
    {this.missionService.getBudgetsProjet(this.codeDept).subscribe(
      data => { this.budgets=data;},
      error => {console.log(error); } , 
      () => {console.log('loading budgets was done ')}
    )}
  

  add(){
    console.log(this.BudgetProjForm.value) ; 
    const m = this.BudgetProjForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addBudgetProj(m).subscribe(
      res => {
        alert(JSON.stringify(res));    
      }    
    )
  } 
   
  loadProjet()
  {this.missionService.getProjet(this.codeDept).subscribe(
    data => { this.projets=data;},
    error => {console.log(error); } , 
    () => {console.log('loading projets was done') ;}
  )}

}
