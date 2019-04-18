import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from '../services/mission.service';
import { mission } from '../models/mission';
import { budget } from '../models/budget';
import { Pays } from '../models/pays';
import { Projet } from '../models/Projet';
import { TypeFrais } from '../models/typeFrais';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frais-mission',
  templateUrl: './frais-mission.component.html',
  styleUrls: ['./frais-mission.component.css']
})
export class FraisMissionComponent implements OnInit {
  numMission : String ; 
  op:Boolean ; 
  checked:Boolean ; 
  OrdMissForm:FormGroup ; 
  payss: Pays[] ; 
  cod :String;
  val_miss:Number; 
  val_trans:Number; 
  budget_mission:budget;
val_mission :String ; 
valeur_trans : String ; 
valeur_budget : Number ; 
val_budget:String ; 
projets: Projet[] ; 
radioProjet:Boolean ; 
typeFrais : TypeFrais [] ; 
public supportes:Array<string> = [
 'التحمل على الحساب الخاص' ,
 'التحمل على الهيكل المعني'
];



  constructor(private router : Router, private fb : FormBuilder ,private  missionService : MissionService) { 
   
    this.OrdMissForm = this.fb.group({
      numMission: ['',Validators.required],
      numord: ['',Validators.required],
      cin  :['',Validators.required],
      code:['',Validators.required] ,
      codPays:['',Validators.required],
     valeurP:['',Validators.required],
     valeurR:['',Validators.required],
     //supporte:['',Validators.required],
      codPrj:['',Validators.required],
      //observ:['',Validators.required],
      //aobserv:['',Validators.required],
      typetransport : ['',Validators.required],
      NVille : ['',Validators.required]
    }) ; 
  }


  add(){
    console.log(this.OrdMissForm.value) ; 
    const m = this.OrdMissForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addFrais(m).subscribe(
      res => {
        alert(JSON.stringify(res));
      }
    )
 this.router.navigateByUrl('recap') ; 
  }  




  toggleRadio(event) {
    if ( event.target.checked) {
      this.radioProjet=true;
    
   }
 else
     {this.radioProjet=false ;}
}
  toggleEditable(event) {
    if ( event.target.checked ) {
        this.op= true;
    
   }
 else
     {this.op=false ;    }
}

loadBudget(cod : String){this.missionService.getBudget(this.cod).subscribe(
    data => { this.budget_mission=data;
    console.log(this.budget_mission) ;
    this.val_miss=this.budget_mission.valeur_miss ; 
    console.log(this.budget_mission.valeur_miss) ; 
    this.val_mission=this.val_miss+'';
    this.val_trans=this.budget_mission.valeur_tr ; 
    this.valeur_trans=this.val_trans+''; 
    this.valeur_budget=+this.val_miss + +this.val_trans ; 
    this.val_budget=this.valeur_budget+'' ; 
    console.log(this.val_budget);
 },
    error => {console.log(error); } , 
    () => {console.log('loading budget was done ') ; }
  )}
  loadpays()
  {this.missionService.getPays().subscribe(
    data => { this.payss=data;},
    error => {console.log(error); } , 
    () => {console.log('loading pays was done ')}
  )}
  loadTypeFrais()
  {this.missionService.getTypeFrais().subscribe(
    data => { this.typeFrais=data;
    console.log(data);},
    error => {console.log(error); } , 
    () => {console.log('loading frais was done ')}
  )}

 
loadProjets()
  {this.missionService.getProjet(this.cod).subscribe(
    data => { this.projets=data;},
    error => {console.log(error); } , 
    () => {console.log('loading projets was done ');}
  )}
  num_ord:String ;
  codeMission:String ; 
  username:String ;
  
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

  ngOnInit() {
    this.codeMission = JSON.parse(localStorage.getItem('num_mission')) ;
    console.log('noum Mission',this.codeMission);   
    this.num_ord = JSON.parse(localStorage.getItem('numOrd')) ;
    console.log('numOrd',this.num_ord);   
    this.username = localStorage.getItem('cin');
    console.log("username: "+this.username) ; 


    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.code);
    this.cod=data.code;
    this.loadpays() ; 
    this.loadBudget(this.cod) ;
    this.numMission=JSON.parse(localStorage.getItem('num_mission'));
    console.log('op',this.op) ; 
    this.loadProjets() ; 
    this.loadTypeFrais() ; 
  }

}
