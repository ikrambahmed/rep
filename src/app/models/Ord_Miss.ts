import { mission } from './mission';
import { DeptGen } from './DeptGen';
import { Missionnaire } from './missionnaire';

export class ordMiss {
    constructor(public numord? :Number ,
        public numMission?:mission , 
        public code ?: DeptGen ,
    public  datarrP?:Date , 
	public  datdepP?:Date ,
	public  cin?:Missionnaire ,
    )
    {
        this.code = new DeptGen() ; 
        this.numMission = new mission() ; 
        this.cin= new Missionnaire() ; 
    } 
}