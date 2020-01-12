import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  constructor(private voitureS:VoitureServiceService) { }
  voitures;
  chauffeur;
  chf;
  ngOnInit() {

    this.voitureS.getRessource("/voitures").subscribe(
      (data)=>{
        this.voitures=data
      },(err)=>{
        console.log(err)
      });
    
    
    
  }
  getChauffeur(id){
    console.log(id)
    this.chf=id;
    this.voitureS.getRessource("/voitures/"+id+"/chauffeur").subscribe(
      (data)=>{
        this.chauffeur=data;
      },
      (err)=>{
        console.log(err);
      }
    );
      
  }

}
