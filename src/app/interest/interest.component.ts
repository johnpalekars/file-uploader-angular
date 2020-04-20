import { Component, OnInit, Inject } from '@angular/core'



@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css'],
})
export class InterestComponent implements OnInit {

  // ---------------------------------------------
  // ITS A DUMMY COMPONENT, ITS NOT USED IN PROJECT
  // ---------------------------------------------

  Principal: number;
  Period: number;
  Rate: number;
  interest: string;
  dump : number
  constructor() {}

  ngOnInit() { }
  
  Interest() {
    this.dump = (this.Principal * this.Period * this.Rate) / 100
    this.interest = ' तुम्हाला  ' + this.Principal + ' लाखावर '+  this.Rate +'% टक्केवारीसह '+ this.Period +'  वर्षानंतर '+ this.dump +' रुपये व्याज मिळेल '
  }
  

 
}

