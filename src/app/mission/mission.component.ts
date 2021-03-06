import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { budget } from '../models/budget';
import { Motcle } from '../models/Motcle';
import { mission } from '../models/mission';
import { MissionService } from '../services/mission.service';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  Avoirbudg:Boolean ; 
  x:Number ; 
  Date_depart :Date ; 
  Date_arrivee:Date; 
  show : Boolean  ; 
  datdepP1:Date=new Date() ; 
  datarrP1:Date=new Date() ; 
  mission: mission ; 
  cod : String ;
  codeMission : String ; 
  missionForm:FormGroup;
  date_debut:Date ; 
  currentYea: number;
  strr : String ; 
  motcles : Motcle [];
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  y:String = this.year.toString().substr(2,2) ; 
  modalRef: BsModalRef;
 
 

  constructor(private modalService: BsModalService,private fb : FormBuilder , private missionService:MissionService,private router:Router ) { 
    this.createForm() ; 
    this.currentYea = (new Date()).getFullYear() ;
   }
 
   loadMotcle()
   {this.missionService.getMotcle().subscribe(
     data => { this.motcles=data;},
     error => {console.log(error); } , 
     () => {console.log('loading motcles was done ')}
   )}
budgets : budget[] ; 
loadBudgets()
{this.missionService.getBudgets(this.cod).subscribe(
  data => { this.budgets=data;
  console.log('length',data.length) ;
if((data.length==0)||(data==null) || (data==undefined)){
  this.Avoirbudg=false ; 
  console.log(this.Avoirbudg) ;

}
else
this.Avoirbudg=true ;
console.log(this.Avoirbudg) ;
},
  error => {console.log(error); } , 
  () => {console.log('loading budgets was done ')}
)}
Avoirbudgproj:Boolean ; 
budgetsProjet:budget[] ; 

dateDiff(date1, date2){
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  let sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-sec)/60);    // Nombre de minutes (partie entière)
  let min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-min)/60);    // Nombre d'heures (entières)
  let hour = tmp % 24;                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-hour)/24);   // Nombre de jours restants
  let day = tmp;
  console.log('days',day) ; 

  return day;
}


loadBudgetsProjet()
{this.missionService.getBudgetsProjet(this.cod).subscribe(
  data => { this.budgetsProjet=data;
    console.log(data.length) ; 
    if((data.length==0)||(data==null) || (data==undefined)){
      this.Avoirbudgproj=false ; 
      console.log('budproj',this.Avoirbudgproj) ;   
    }
    else
    this.Avoirbudgproj=true ;
    console.log('budproj',this.Avoirbudgproj) ;
  },
  error => {console.log(error); } , 
  () => {console.log('loading budgets was done ')}
)}
nb:number ; 
ajout:boolean;
template: TemplateRef<any>;
toggle(){
  console.log('karouma') ;
  console.log(this.datdepP1) ; 
  console.log(this.datarrP1) ; 
  let key1 = 'datdepP';

  localStorage.setItem(key1, JSON.stringify(this.datdepP1));
  let key2 = 'datarrP';

  localStorage.setItem(key2, JSON.stringify(this.datarrP1));

  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let dateString=localStorage.getItem('datdepP') ; 
      this.Date_depart = new Date(dateString);
      console.log('daate',this.Date_depart) ; 
     
      let dateString2=localStorage.getItem('datarrP') ; 
      this.Date_arrivee = new Date(dateString2);
     console.log(this.Date_arrivee) ; 
     this.nb =this.dateDiff(this.Date_depart,this.Date_arrivee) ;
     if(this.nb<=0){
      //alert('erreur ');
      // this.ajout=true;
       window.alert('erreur') ; 
      }
     else{
     console.log('durree',this.nb) ; 
     let key3='duree' ; 
     localStorage.setItem(key3, JSON.stringify(this.nb));}
      resolve();
    }, 1000);
  
});

}
  ngOnInit() {
    //this.mission=new mission() ; 
    this.currentYea = (new Date()).getFullYear() ; 
    this.strr=this.currentYea.toString() ;
    this.loadMotcle() ;
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.code) ;
    this.cod=data.code ;
    console.log('cod'+this.cod) ;  
    console.log('d'+this.d) ; 
    console.log('year'+this.year) ; 
    console.log('y'+this.y) ; 
    this.reloadCode() ; 
    this.show=true ; 
    this.loadBudgets() ; 
    this.loadBudgetsProjet() ; 
   
  }
  createForm()
  {
    console.log('creation form') ; 
    this.missionForm = this.fb.group({
      numMission:['',Validators.required],
      code :['',Validators.required]  , 
      objeta: ['',Validators.required],
      objetl: ['',Validators.required],
      datdepP: ['',Validators.required],
      datarrP : ['',Validators.required],
      motcle :  ['',Validators.required] , 
      duree  :  ['',Validators.required] 
  });
  }

  add(){
    const m = this.missionForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addMission(m).subscribe(
      res => {
        this.mission=res ; 
          console.log("donne") ;   
          let key = 'num_mission';
          localStorage.setItem(key,this.missionForm.get('numMission').value);
          let key1 = 'datdepP';

          localStorage.setItem(key1, JSON.stringify(this.datdepP1));
          let key2 = 'datarrP';

          localStorage.setItem(key2, JSON.stringify(this.datarrP1));
          let x =this.dateDiff(this.datdepP1,this.datarrP1) ; 
          console.log('durree',x) ; 
          let key3='duree' ; 
          localStorage.setItem(key3, JSON.stringify(this.x));

          this.reloadCode() ; 
          this.createForm() ; 
          this.ngOnInit();
          this.show=false ;
          this.router.navigateByUrl('ord') ;
         },
         error=>{console.log(error);}    
    )
  }

  reloadCode(){
  this.missionService.getLatestMissionCode(this.cod).subscribe(
  d=>{
    if((d==null) || (d==undefined) || (d.length ==0 ))
    {
      this.codeMission=this.y+"0001" ; 
      console.log('codeMissioNLOad'+this.codeMission) ; 
    
    }
    else 
    {
      this.codeMission=(Number(d)+1)+"" ;
      console.log('codeMissioNLOad'+this.codeMission) ; 

    }
    let key = 'num_mission';
 //  localStorage.setItem(key,JSON.stringify(this.codeMission));
  // localStorage.setItem(key,this.missionForm.get('numMission').value);
  //console.log('codeeee',this.missionForm.get('numMission').value);

 //  this.x =this.dateDiff(this.datdepP,this.datarrP) ; 
  //console.log('durreeeee',this.x) ; 


  }) ; 
}
clickMethod(name: string) {
  if(confirm("Are you sure to delete "+name)) {
    console.log("Implement delete functionality here");
  }
}


}
