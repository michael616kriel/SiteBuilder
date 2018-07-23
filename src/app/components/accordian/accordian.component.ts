import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss']
})
export class AccordianComponent implements OnInit {

  @Input('title') title : string

  hidden : boolean = true

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){

  }

  toggle(){
    this.hidden = !this.hidden
  }

}
