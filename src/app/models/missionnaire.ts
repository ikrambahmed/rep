import { grade } from './grade';
import { fonction } from './fonction';
import { classe } from './classe';
import { categorie } from './categorie';
import { DeptGen } from './DeptGen';

export class Missionnaire {
  cin: String;
  matricule: String;
  nom: String;
  nomL: String;
  prenom: string;
  prenomL: String;
  nationalite: String;
  nationaliteL: String;
  datenaissance: Date;
  place_naissance: String;
  rib: String;
  date_cin: Date;
  place_cin: String;
  niveau: String;
  ministr: String;
  groupe: String;
  graade: grade;
  fonnction: fonction;
  classee: classe;
  cat: categorie;
  code:DeptGen ; 

  constructor(
    cin?: String,
    matricule?: String,
    nom?: String,
    nomL?: String,
    prenom?: string,
    prenomL?: String,
    nationalite?: String,
    nationaliteL?: String,
    datenaissance?: Date,
    place_naissance?: String,
    rib?: String,
    date_cin?: Date,
    place_cin?: String,
    niveau?: String,
    ministr?: String,
    groupe?: String,
    graade?: grade,
    fonnction?: fonction,
    classee?: classe,
    cat?: categorie,
    code?:DeptGen,
    // public  group?:number ,
    //   public  dept?:number 
  ) {
    // public  group?:number ,
    // public  dept?:number 
    this.code=new DeptGen() ; 
    this.graade = new grade();
    this.fonnction = new fonction();
    this.classee = new classe();
    this.cat = new categorie();

  };

}