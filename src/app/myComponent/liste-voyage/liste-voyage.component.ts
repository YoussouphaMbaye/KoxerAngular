import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { DatePipe } from '@angular/common';
import { Reserver } from 'app/modules/reserver';
import { Voyage } from 'app/modules/voyage';

@Component({
  selector: 'app-liste-voyage',
  templateUrl: './liste-voyage.component.html',
  styleUrls: ['./liste-voyage.component.scss']
})
export class ListeVoyageComponent implements OnInit {

  voyages
  constructor(private voitureServ:VoitureServiceService) { }

  ngOnInit() {
    this.voitureServ.getVoyage("/voyages").subscribe(
      (data)=>{
        this.voyages=data
        console.log(this.voyages)
      },
      (err)=>{
        console.log(err)
      }
    )
    console.log(this.voyages)
  }
  reserver(f,v:Voyage){
    console.log(f.value.nbPlace)
    console.log(v)
    this.voitureServ.getClientByIdpv("/clients/"+1).subscribe(
      (data)=>{
        const client=data;
        
        const rs=new Reserver(0,null,f.value.nbPlace,client,v);
        this.voitureServ.addReserver("/addReserver",rs).subscribe(
          (data)=>{
            let reserver=data
            //update voyage pour changer le nombre de place
            v.nbPlace=v.nbPlace-rs.nbPlace
            this.voitureServ.updateVoyage("/updateVoyage/",v).subscribe(
              (data)=>{
                let voyage=data
              },
              (err)=>{
                console.log(err)
              }
            )
          },
          (err)=>{
            console.log(err)

          }
        )
        const pipe=new DatePipe('en-fr')
        let a=Date.now()
        let now=pipe.transform(a,'short')
        console.log(now)
        
      },
      (err)=>{
        console.log(err)
      }
    )
   
  }

}
