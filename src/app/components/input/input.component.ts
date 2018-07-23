import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input('label') label : string
  @Input('type') type : string
  @Input('data') data : string
  @Input('value') value : string
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>()

  valueHolder : string

  constructor() { }

  ngOnInit() {

  }

  onChange(){
     this.valueChange.emit(this.value);
  }
  

}
