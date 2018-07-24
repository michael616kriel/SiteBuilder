import { Component, OnInit, ContentChildren, QueryList, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() tabClick = new EventEmitter<TabComponent>();

  constructor() { }

  ngOnInit() {
  }

  // contentChildren are set
  ngAfterContentInit() {
    
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first, true);
    }
  }

  selectTab(tab: TabComponent, isInit=false){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
    if(!isInit){
      this.tabClick.emit(tab)
    }
  }

  selectTabByName(name){
    this.tabs.toArray().forEach(tab => {
      if(tab.label === name){
        tab.active = true
        this.tabClick.emit(tab)
      }else{
        tab.active = false
      }
    })
  }

  selectFirst(){
    let scope = this
    setTimeout(function() { //just wait for angular ui changes to take effect
      scope.selectTab(scope.tabs.first, false);
    },1)
    
  }

}
