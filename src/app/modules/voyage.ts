import { Chauffeur } from "./chauffeur";



export class Voyage{
    constructor(
        public idVoyage:number,
        public chauffeur:Chauffeur,
        public depart:string,
        public destination:string,
        public dateDepart:string,
        public tarif:number,
        public nbPlace:number,
    ){

    }
}