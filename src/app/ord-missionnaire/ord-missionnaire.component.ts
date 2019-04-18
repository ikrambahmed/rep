import { Component, OnInit, Input, NgZone, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder,Validators,ReactiveFormsModule  } from '@angular/forms';
import { MissionnaireService } from '../services/missionnaire.service';
import { Missionnaire } from '../models/missionnaire';
import { mission } from '../models/mission';
import { ordMiss } from '../models/Ord_Miss';
import { MissionService } from '../services/mission.service';
import { OrdMissService } from '../services/ord-miss.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ord-missionnaire',
  templateUrl: './ord-missionnaire.component.html',
  styleUrls: ['./ord-missionnaire.component.css']
})
export class OrdMissionnaireComponent implements OnInit {
  numMission:String ;
  duree_miss:number ;  
  cin: string = '';
  existe : Boolean ; 
  numOrd:number =0; 
  num:number=0;
  OrdMissForm :FormGroup ; 
  missionnare : Missionnaire ; 
  nom: String ; 
  prenom : String ; 
  Date_depart :Date = new Date(); 
  Date_arrivee:Date= new Date(); 
  date_dep : Date ; 
  date_ret:Date ; 
  ordmiss : ordMiss ; 
  num_miss :String ; 
  cod : String ;
  show1 : Boolean ;
  @Input()
  date_debut ; 
  duree:number ; 
  date: any = { date: {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate()} };
   // This is an output component that tells the rest of the world that the user has entered a valid text

   timer :any = null;
  constructor(private router : Router ,private fb : FormBuilder , private missionService : MissionService , private ordMisService : OrdMissService) { 
   
    this.OrdMissForm = this.fb.group({
      cin: ['',Validators.required],
      datarrP: ['',Validators.required],
      datdepP: ['',Validators.required],
      code : ['',Validators.required],
      numMission:['',Validators.required] , 
      numord : ['',Validators.required] , 
      duree : ['',Validators.required] ,
    }) ; 
  }


  
  
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

toggle(){
  console.log('karouma') ;
  console.log('date dep',this.date_dep) ; 
  console.log('date_arr',this.date_ret);
  let key1 = 'datdepP1';
  localStorage.setItem(key1, JSON.stringify(this.date_dep));
  let key2 = 'datarrP1';

  localStorage.setItem(key2, JSON.stringify(this.date_ret));

  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let dateString=JSON.parse(localStorage.getItem('datdepP1')) ; 
      this.date_dep = new Date(dateString);
      console.log('daate',this.Date_depart) ; 
     
      let dateString2=JSON.parse(localStorage.getItem('datarrP1')) ; 
      this.date_ret = new Date(dateString2);
     console.log(this.Date_arrivee) ; 
     
     this.duree_miss =this.dateDiff(this.date_dep,this.date_ret) ;
     console.log('durree',this.duree_miss) ; 
     let key3='duree_missionnaire' ; 
     localStorage.setItem(key3, JSON.stringify(this.duree_miss));
      resolve();
    }, 2000);
  
});}


  add(){
    const m = this.OrdMissForm.value ;
   // alert(JSON.stringify(m));
    this.missionService.addOrdMiss(m).subscribe(
      res => {
      let key='numOrd' ;
      let ord=this.num+"" ; 
      localStorage.setItem('cin',this.cin);
        localStorage.setItem(key,ord);
      let x= this.dateDiff(this.Date_depart,this.Date_arrivee) ; 
      console.log('x',x) ; 
        this.ordmiss=res; 
        this.show1=true ; 
      

          

         },
         error=>{console.log(error);}    
    )
    this.router.navigateByUrl('frais') ;

  }

  Search(cin)
  {
    if((cin!=null) || (cin.length!=0)|| (cin !=''))
    return this.missionService.getOneMiss(cin).subscribe(
      data => { 
        if (data && data['cin']) {
        this.missionnare=data ; 
        this.nom=data['nom']; 
        this.prenom=data.prenom ; 
       //this.Date_arrivee=this.date_debut ; 
       //console.log(this.Date_arrivee) ;
       //this.Date_depart=this.mission.date_fin ; 
        console.log(this.nom , this.prenom) ; 
        console.log('lkitou el cin') ; 
        this.existe=true ; 
      }
     else 
     this.existe=false ; },
      error => {console.log(error); 
     } , 
      () => {console.log('loading classes was done ')}
    )
  }
    go(){
      this.cin='' ; 
    }
    name: string = '';
    name1: string = '';
    _timeout: any = null;
 
 
    displayName() {
      this._timeout  = null;
      if(this._timeout){ 
        window.clearTimeout(this._timeout);
      }

      this._timeout = window.setTimeout(() => {
         this._timeout = null;
        // this.lc.run(() => this.name1 = this.name);
         console.log('ikrammmm',this.name1) ;
         console.log(this.cin.length) ;
         if( (this.cin.length==0)|| (this.cin =='')||(this.cin.length!=8))
         console.log("erreur") ; 
         else 
          this.Search(this.cin);
      },5000);
   
}


 doStuff() {
    alert('do stuff');
}

  ngOnInit() {

  this.num_miss = JSON.parse(localStorage.getItem('num_mission')) ;
  console.log('noumrou',this.num_miss); 
  var DeptGenVal = localStorage.getItem('deptGen') ; 
  var data = JSON.parse(DeptGenVal) ; 
  console.log('retrievedObject:',data.code) ;
  this.cod=data.code ;

  let dateString=localStorage.getItem('datdepP') ; 
  this.Date_depart = new Date(dateString);
  console.log('daate',this.Date_depart) ; 

  let dateString2=localStorage.getItem('datarrP') ; 
  this.Date_arrivee = new Date(dateString2);
  console.log(this.Date_arrivee) ; 
  this.show1=false;
this.duree =this.dateDiff(this.Date_depart,this.Date_arrivee) ;
console.log('duree mission',this.duree);
this.reloadCode();
}

reloadCode(){
  console.log('numMission',this.num_miss);
  this.ordMisService.getLatestOrdreCode(this.cod,this.num_miss).subscribe(
    d=>{
      if((d==null) || (d == undefined) || (d == 0 ))
      {
        this.num=1 ; 
        console.log('codeMissioNLOad'+this.num) ; 

      }
      else 
      {      
        this.num=(d+1);
        console.log('codeOrdre'+this.num) ; 
      }
    }) ; 
  
}

}