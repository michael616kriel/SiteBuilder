import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input('label') label : string
  active : boolean

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    //console.log(this.label)
  }

}
