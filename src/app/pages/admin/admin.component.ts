import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';

import { Project } from '../../models/project'
import { Service } from '../../models/service'

import { AppComponent } from '../../models/app-component'
import { CodeEditorComponent } from '../../components/code-editor/code-editor.component'
import { ProjectListComponent } from '../../components/project-list/project-list.component'
import { ToastComponent } from '../../components/toast/toast.component'

 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild(CodeEditorComponent) editors : CodeEditorComponent
  @ViewChild(ProjectListComponent) projectList : ProjectListComponent
  @ViewChild('toast') toastEle : ToastComponent;

  frameworks = [
    { name : 'AngularJS', active : true },
    { name : 'Handlebars', active : false }
  ]
 
  comopnentCreate = ''

  editModel = {
    HTML : '',
    CSS : '',
    JS : ''
  }

  cloneModel = {
    name : '',
    project : ''
  }

  createModels = {
    component : { name : '' },
    service : { name : '' },
    project : { name : '', framework : this.frameworks[0].name  }
  }
  
  constructor(
    private cdRef:ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {

  }

  selectProject(data){
    this.editors.support(this.projectList.projects[data.projectIndex].supports)
    this.editModel = this.projectList.projects[data.projectIndex].code
  }

  selectComponent(data){
    this.editModel = this.projectList.projects[data.projectIndex].components[data.componentIndex].code
    this.editors.support(this.projectList.projects[data.projectIndex].components[data.componentIndex].supports)
  }

  selectService(data){
    this.editModel = this.projectList.projects[data.projectIndex].services[data.serviceIndex].code
    this.editors.support(this.projectList.projects[data.projectIndex].services[data.serviceIndex].supports)
  }

  cloneProject(){
    this.projectList.cloneProject(this.cloneModel.project, this.cloneModel.name, () => {
        this.toastEle.show('Project cloned successfully!')
        this.cloneModel.name = ''
        this.cloneModel.project = ''
    })
  }

  createProjects(){
    this.projectList.createProject(this.createModels.project.name, this.createModels.project.framework, () => {
      this.toastEle.show('Project created successfully!')
      this.createModels.project.name = ''
    })
  }

  createComponent(){
    this.projectList.createComponent(this.createModels.component.name, this.projectList.project.framework, () => {
      this.toastEle.show('Component created successfully!')
      this.createModels.component.name = ''
    })
  }

  createService(){
    this.projectList.createService(this.createModels.service.name, this.projectList.project.framework, () => {
      this.toastEle.show('Service created successfully!')
      this.createModels.service.name = ''
    })
  }

  saveProject(){
    this.projectList.saveProject(() => {
      this.toastEle.show('Project Saved successfully!')
    })
  }

  onDelete(data){
    if(data.name === 'project'){
      this.toastEle.show('Project Deleted successfully!')
    }else{
      this.toastEle.show('Component Deleted successfully!')
    }
  }

  //do something when project changes
  projectChange(project){
   
  }

  preview(){
    window.open('http://localhost:8081/preview/' + this.projectList.project.id)
  }

}
