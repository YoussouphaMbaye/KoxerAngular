import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Client } from 'app/modules/client';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  constructor(private formB:FormBuilder,private voitureServ:VoitureServiceService) { }

  clientForm;
  client:Client;
  ngOnInit() {
    this.clientForm=this.formB.group({
      nom:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      tel:[''],
      password:['',[Validators.required,Validators.min(8)]]
    
    })
  }
  onSubmit(){
    const cForm=this.clientForm.value;
    const client= new Client(0,null,cForm['nom'],cForm['email'],cForm['password'],cForm['tel'],null,null);
    this.voitureServ.addClient("/addClient",client).subscribe(
      (data)=>{
        this.client=data;
      },
      (err)=>{
        console.log(err)
      }
    )
  }

}
