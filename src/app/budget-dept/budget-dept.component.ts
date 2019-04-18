import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from '../services/mission.service';
import { budget } from '../models/budget';

@Component({
  selector: 'app-budget-dept',
  templateUrl: './budget-dept.component.html',
  styleUrls: ['./budget-dept.component.css']
})
export class BudgetDeptComponent implements OnInit {
  BudgetDeptForm:FormGroup ; 
  y :String='' ;
  d:Date ; 
  year : number ; 
  dataSys :Date = new Date() ;
  cod : String ;  
  constructor(private fb : FormBuilder ,  private missionService: MissionService) { 
    this.createForm() ; 

  }
  createForm()
  {
    this.BudgetDeptForm = this.fb.group({
      date_budg: ['',Validators.required],
      valeur_miss: ['',Validators.required],
      reference_mis :['',Validators.required],
      valeur_tr: ['',Validators.required],
      reference_tr: ['',Validators.required] , 
      code : ['',Validators.required] 
    })}
    budgets : budget[] ; 
    loadBudgets()
    {this.missionService.getBudgets(this.cod).subscribe(
      data => { this.budgets=data;
      console.log(data) ; },
      error => {console.log(error); } , 
      () => {console.log('loading budgets was done ')}
    )}
  

  add(){
        console.log(this.BudgetDeptForm.value) ; 
        const m = this.BudgetDeptForm.value ;
        alert(JSON.stringify(m));
        this.missionService.addBudgetDept(m).subscribe(
          res => {
            alert(JSON.stringify(res));    
          }    
        )
      }   
   
  ngOnInit() {
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.code) ;
    this.cod=data.code ;
    this.d = new Date() ; 
    this.year= this.d.getFullYear() ;   
    this.y=this.year+"" ; 
    console.log(this.year.toString()) ; 
    console.log(this.y) ;
    this.loadBudgets() ; 
  }

}
