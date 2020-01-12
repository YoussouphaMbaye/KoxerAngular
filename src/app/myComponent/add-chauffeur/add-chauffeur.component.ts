import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chauffeur } from 'app/modules/chauffeur';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Voiture } from 'app/modules/voiture';

@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.scss']
})
export class AddChauffeurComponent implements OnInit {

  constructor(private formB:FormBuilder,private voitureServ:VoitureServiceService) { }

  chaufForm;
  chauffeur:Chauffeur;
  
  ngOnInit() {
    this.chaufForm=this.formB.group({
      nom:"",
      prenom:"",
      tel:"",
      matricule:"",
      type:"",
      nombreDePlace:"",
  });
  }
  addChauffeur(){
    const chF=this.chaufForm.value;
    
    console.log(chF);
    let chauf:Chauffeur=new Chauffeur(0,chF["nom"],chF["prenom"],chF["tel"]);
    console.log(chauf.nom);
    this.voitureServ.addChauffeur("/addChauffeur",chauf).subscribe(
      data=>{
        this.chauffeur=data;
        const voiture=new Voiture(0,chF['matricule'],chF['nombreDePlace'],chF['type'],data);
        this.voitureServ.addVoiture("/addVoiture",voiture).subscribe(
          data1=>{console.log(data1.type)},
          err=>{console.log(err)}
        )
      },
      err=>{console.log(err)}

    );
  }

}
