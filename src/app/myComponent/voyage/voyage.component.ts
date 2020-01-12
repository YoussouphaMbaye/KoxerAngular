import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Voyage } from 'app/modules/voyage';
import { ChauffeurComponent } from '../chauffeur/chauffeur.component';
import { Chauffeur } from 'app/modules/chauffeur';
import { Voiture } from 'app/modules/voiture';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {

  constructor(private formB:FormBuilder,private voitureServ:VoitureServiceService) { }
  voyageForm;
  private voyage:Voyage;
  private voiture:Voiture;
  ngOnInit() {
    this.voyageForm=this.formB.group({
      depart:"",
      destination:"",
      ladate:"",
      heure:"",
      tarif:""
    })
  }
  addVoyage(){
    console.log(this.voyageForm.value)
    const vfm=this.voyageForm.value
    //modifier id chauffeur
    let chauffeur:Chauffeur;
    this.voitureServ.getChauffeurById("/chauffeurs/"+1).subscribe(
      (data)=>{
        chauffeur=data;
        console.log("cccc"+chauffeur)
        console.log( chauffeur)
        //voiture pour avoir le nombre de place
        this.voitureServ.getVoitureById("/chauffeurs/"+chauffeur.idChauffeur+"/voiture").subscribe(
          (data)=>{
            this.voiture=data;
            console.log("nnn"+this.voiture)
            let a=vfm['ladate']+" "+vfm['heure'];
        this.voyage=new Voyage(0,chauffeur,vfm['depart'],vfm['destination'],a,vfm['tarif'],this.voiture.nombreDePlace)
        this.voitureServ.addVoyage("/addVoyage",this.voyage).subscribe(
          (data)=>{
            this.voyage=data
            console.log(data)
          },(err)=>{
            console.log(err)
          })
          },
          (err)=>{
            console.log(err)
          }
        )
        
      },
      (err)=>{

      }
    )
    
    console.log(this.voyageForm.value['ladate']+" "+this.voyageForm.value['date'])
    console.log(this.voyage.dateDepart);

  }

}
