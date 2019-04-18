import { Component, OnInit } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { budget } from '../models/budget';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  PojetForm : FormGroup ; 
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  cod : String ; 
  codeProjet:String ; 
  DateSaisie : Date = new Date() ; 
  constructor(private fb : FormBuilder , private missionService : MissionService) {
    this.PojetForm = this.fb.group({  
      codPrj: ['',Validators.required],
      libprjA: ['',Validators.required],
      libPrjL: ['',Validators.required],
      code : ['',Validators.required]
    });}

   add(){
    const m = this.PojetForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addProjet(m).subscribe(
      res => {
        this.reloadCodeProjet() ; 
          console.log("donne ajout") ;   
         },
         error=>{console.log("erreur");}    
    )
  }

reloadCodeProjet(){
  this.missionService.getLatestProjetCode(this.cod).subscribe(
    d=>{
      if((d==null) || (d==undefined) || (d.length ==0 ))
      {
        this.codeProjet="1" ; 
        console.log('codeMissioNLOad'+this.codeProjet) ; 

      }
      else 
      {
        this.codeProjet=(d+1)+"" ;
        console.log('codeMissioNLOad'+this.codeProjet) ; 
      }
  
    }) ; 
  
}

  ngOnInit() {
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.code) ;
    this.cod=data.code ;
    this.reloadCodeProjet() ;
  }

}
