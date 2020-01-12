import { Chauffeur } from "./chauffeur";

export class Voiture{
    constructor(public id:number,public matricule:String,public nombreDePlace:number,public type:String,public Chauffeur:Chauffeur){

    }
}