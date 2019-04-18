import { Injectable } from '@angular/core';
import { frais } from '../models/frais';
import { Observable } from 'rxjs';
import { mission } from '../models/mission';
import { budget } from '../models/budget';
import { budgetProjet } from '../models/budgetProjet';
import { Projet } from '../models/Projet';
import { ordMiss } from '../models/Ord_Miss';
import { HttpClient } from '@angular/common/http';
import { environment } from '../shared/environment';

@Injectable()
export class MissionService {

  baseUrl = environment.baseUrl;

  missions : mission[];
  constructor(private http : HttpClient) { }

  getProjet(dept : String ) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/listeProjetByDept?codeDept='+dept) ; 
  }
  getOneMiss(cin : String) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/getOneMiss?cin='+cin) ; 
   }
  getMissions(codeDept: String):Observable<any> {
    return this.http.get(this.baseUrl+'/api/mission/listeMissionByDept?codeDept='+codeDept) ; 
  }

  addOrdMiss(o:ordMiss):Observable<any> {
    
    return this.http.post(this.baseUrl+'/api/addordMiss',o  ) ; 
  }
  
  addMission( mission : mission) : Observable<any>{
    console.log('el service') ; 
    return this.http.post(this.baseUrl+'/api/mission/add' ,mission  ) ; 
  }
  getMotcle():Observable<any> 
  {
    return this.http.get(this.baseUrl+'/api/allMotcle') ; 
  }

  getLatestMissionCode(code : String) :Observable<any>{
    return this.http.get(this.baseUrl+'/api/mission/latestMissionCode?codeDept='+code) ; 
  }
  getPays() :Observable<any>{
    return this.http.get(this.baseUrl+'/api/listPays') ; 
  }
  getBudget(code :String) :Observable<any>{
    return this.http.get(this.baseUrl+'/api/listbyDept?codeDept='+code) ; 
  }
  addBudgetDept(m :budget):Observable<any>{
    return this.http.post('http://localhost:8080/miss_cni-0.0.1-SNAPSHOT/api/addBudget' , m) ; 

  }
  addBudgetProj(m :budgetProjet):Observable<any>{
    return this.http.post(this.baseUrl+'/api/addBProjet', m) ; 
  }
  addProjet( p:Projet):Observable<any> {
    return this.http.post(this.baseUrl+'/api/addProjet', p) ;
  }

  getLatestProjetCode(code : String) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/latestProjetCode?codeDept='+code) ;
  }

  getBudgets(code:String): Observable<any>{
    return this.http.get(this.baseUrl+'/api/listbyDept?codeDept='+code) ;
  }
  getBudgetsProjet(code:String):Observable<any>{
    return this.http.get(this.baseUrl+'/api/listBudgetProjetbydept?codeDept='+code) ; 

  }
  getTypeFrais():Observable<any>{
    return this.http.get(this.baseUrl+'/api/listType') ; 
  }

  getOneMission(m:mission):Observable<any>{
    console.log("inside service");
    return this.http.post(this.baseUrl+'/api/mission/findById',m) ; 
  }
  getFraisMission(numMission:String , numOrd:Number , cin :String , codeDept : String ):Observable<any>{
    return this.http.get(this.baseUrl+'/api/getFraisMission?numMission='+numMission+'&numOrd='+numOrd+'&cin='+cin+'&codeDept='+codeDept) ; 

  }
  addFrais(m:frais):Observable<any>{
    console.log('service frais') ; 
    return this.http.post(this.baseUrl+'/api/addFrais',m) ; }
  updateBudget(a :budget){
     return this.http.put(this.baseUrl+'/api/updateBudget',a) ; 
    }

  updateBudgetProjet(a :budgetProjet){
    console.log('west service');
      return this.http.put(this.baseUrl+'/api/updateBudgetProjet',a) ; 
     }
 
}
