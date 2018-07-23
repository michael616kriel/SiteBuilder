import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  message : string

  constructor() { }

  ngOnInit() {
  }

  show(msg : string){
    console.log(msg)
    this.message = msg
    $('.toast').addClass('show')
    setTimeout(function(){
      $('.toast').removeClass('show')
    }, 2000)
  }


}
