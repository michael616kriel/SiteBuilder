import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-pane',
  templateUrl: './sidebar-pane.component.html',
  styleUrls: ['./sidebar-pane.component.scss']
})
export class SidebarPaneComponent implements OnInit {

  @Input('title') title : string

  constructor() { }

  ngOnInit() {
  }

}
