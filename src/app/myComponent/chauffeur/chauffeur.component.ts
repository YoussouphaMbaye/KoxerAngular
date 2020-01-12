import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  constructor() { }
  url;
  ngOnInit() {
    this.url=sessionStorage.getItem("photoUrl");
  }

}
