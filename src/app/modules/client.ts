export class Client{
    constructor(
        public idClient:number,
        public idProvider:String,
        public nom:string,
        public email:String,
        public password:String,
        public tel:String,
        public provider:String,
        public photoUrl:String){}
}