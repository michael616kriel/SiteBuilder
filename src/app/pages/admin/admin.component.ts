/*
ADD SUPPORT FOR : 
  - VUE
  - REACT
  - ANGULAR 1-6

  DELETING BUG

*/

import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

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

  projects : Array<Project> = new Array<Project>()
  project : Project = new Project()

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
    private http : Http,
    private cdRef:ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.getProjects((data) => {
      //map sever data to data models
      for(var k in data){
        let item = this.mapData(data[k])
        this.projects.push(item)
      }
      if(this.projects[0]){
        this.project = this.projects[0]
        this.projectList.setEdit(this.projects[0], null, null)
      }
    })
  }

  mapData(data){
    let project = new Project()
    for(var t in data){
      project[t] = data[t]
    }
    return project
  }


  getProjects(callback : Function){
    this.http.get('http://localhost:8081/projects/get').subscribe(res => callback(res.json()))
  }


  selectProject(data){
    this.editors.support(this.projects[data.projectIndex].supports)
    this.editModel = this.projects[data.projectIndex].code
  }

  selectComponent(data){
    this.editModel = this.projects[data.projectIndex].components[data.componentIndex].code
    this.editors.support(this.projects[data.projectIndex].components[data.componentIndex].supports)
  }

  selectService(data){
    this.editModel = this.projects[data.projectIndex].services[data.serviceIndex].code
    this.editors.support(this.projects[data.projectIndex].services[data.serviceIndex].supports)
  }

  cloneProject(){

    let clone = null
    for(var k in this.projects){
      if(this.projects[k].name === this.cloneModel.project){
        //clone
        clone = this.projects[k]
      }
    }
    if(clone){
      let project = new Project(this.cloneModel.name)
      project.components = clone.components
      project.code = clone.code
      this.http.post('http://localhost:8081/projects', { data : project }).subscribe(res => {
          this.toastEle.show('Project cloned successfully!')
          project.id = res.json().data.id //id is important for other operations
          this.projects.push(project)
          this.projectList.setEdit(this.projects[this.projects.length - 1], null, null)
          this.cloneModel.name = ''
          this.cloneModel.project = ''
      })
    }else{
      alert('select a project to clone first')
    }

  }


  createProjects(){
    let project = new Project(this.createModels.project.name, this.createModels.project.framework)
    this.http.post('http://localhost:8081/projects', { data : project }).subscribe(res => {

      this.toastEle.show('Project created successfully!')
      project.id = res.json().data.id //id is important for other operations
      this.projects.push(project)
      this.projectList.setEdit(this.projects[this.projects.length - 1], null, null)
      this.createModels.project.name = ''

    })
  }

  createComponent(){
    this.project.framework
    let comp = new AppComponent(this.createModels.component.name, this.project.framework)

    this.project.components.push(comp)
    let update = {
      components : this.project.components
    }

    this.http.post('http://localhost:8081/project/update', { data : update, id : this.project.id }).subscribe(res => {
      this.toastEle.show('Component created successfully!')
      this.createModels.component.name = ''
      let proj = this.mapData(res.json())
    })

  }

  createService(){
    this.project.framework
    let service = new Service(this.createModels.service.name, this.project.framework)

    this.project.services.push(service)
    let update = {
      services : this.project.services
    }

    this.http.post('http://localhost:8081/project/update', { data : update, id : this.project.id }).subscribe(res => {
      this.toastEle.show('Service created successfully!')
      this.createModels.service.name = ''
      let proj = this.mapData(res.json())
    })

  }

  saveProject(){
    this.http.post('http://localhost:8081/project/update', { data : this.project, id : this.project.id }).subscribe(res => {
      this.toastEle.show('Project Saved successfully!')
      this.createModels.component.name = ''
      let proj = this.mapData(res.json())
    })
  }


  onDelete(data){
    if(data.name === 'project'){
      this.toastEle.show('Project Deleted successfully!')
    }else{
      this.toastEle.show('Component Deleted successfully!')
    }
  }

  //handle when project gets changed
  projectChange(project){
    this.project = project
  }

  preview(){
    window.open('http://localhost:8081/preview/' + this.project.id)
  }

  projectTitle(){
    let name = this.project.name
    for(var k in this.project.components){
      var comp = this.project.components[k]
      if(comp.active){
        name += ' ('+comp.name+')'
      }
    }
    return name
  }


}
