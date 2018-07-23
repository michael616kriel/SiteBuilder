import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Project } from '../../models/project'
import { AppComponent } from '../../models/app-component'
import { CodeEditorComponent } from '../../components/code-editor/code-editor.component'
import { ProjectListComponent } from '../../components/project-list/project-list.component'
import { ToastComponent } from '../../components/toast/toast.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(){}
  
  ngOnInit(){

  }

}
