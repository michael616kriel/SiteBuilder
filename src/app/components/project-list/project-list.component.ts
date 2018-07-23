import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'
import { Project } from '../../models/project'
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input('projects') projects : Array<Project>
  @Input('project') project : Project

  @Output('onSelectProject') onSelectProject = new EventEmitter<any>();
  @Output('onSelectComponent') onSelectComponent = new EventEmitter<any>();
  @Output('onDelete') onDelete = new EventEmitter<any>();
  

  @Output() projectChange: EventEmitter<Project> = new EventEmitter<Project>()
  @Output() projectsChange: EventEmitter<Project> = new EventEmitter<Project>()

  constructor(private http : Http) { }

  ngOnInit() {
    this.dropdown()
  }

  dropdown(){
    $(function(){
      $('.dropdown > span, .dropdown-menu > li span').unbind().on('click', function() {
        var ele = $(this).parent()
        var toggle = (!ele.attr('toggle') || ele.attr('toggle') === 'false') ? 'true' : 'false'
        ele.attr('toggle', toggle)
        if(toggle === 'false'){
          ele.find('.dropdown-menu').first().slideUp(300)
        }else{
          ele.find('.dropdown-menu').first().slideDown(300)
        }
      })
    })
  }

  findIndex(items, item){
  //  console.log(items, item)
    for(var k=0; k < items.length; k++){
    //  console.log(items[k])
      if(items[k].id){
        if(items[k].id === item.id){
          return k
        }
      }else{
        if(items[k].name === item.name){
          return k
        }
      }
    }
    return null
  }

  setEdit(project, comp){

    this.project = project
    this.projectChange.emit(project)
    let projectIndex = this.findIndex(this.projects, project)

    //disable all
    for(var k in this.projects){
      this.projects[k].active = false
      for(var key in this.projects[k].components){
        this.projects[k].components[key].active = false
      }
    }
    
    if(comp === null){ //if Project
      project.active = true
      this.onSelectProject.emit({ projectIndex : projectIndex })
    }else if(comp){ //if Component
      let componentIndex = this.findIndex(this.projects[projectIndex].components, comp)
      project.active = true
      comp.active = true
      this.onSelectComponent.emit({ projectIndex : projectIndex, componentIndex : componentIndex })
    }

    this.dropdown()

  }

  delete(project){
    
    if(!confirm('are you sure you want to delete : ' + project.name + ' ?')){
      return
    }
    let projectIndex = this.findIndex(this.projects, project)

    this.projects.splice(projectIndex, 1)

    if(this.project.id === project.id){
      this.setEdit(this.projects[0], null)
    }

    this.http.post('http://localhost:8081/project/delete', { id : project.id }).subscribe(res => {
      this.onDelete.emit({ name : 'project', index : projectIndex})
    })


  }

  deleteComponent(comp, key){
    if(!confirm('are you sure you want to delete : ' + comp.name + ' ?')){
      return
    }
    this.project.components.splice(key, 1)
    let projectIndex = this.findIndex(this.projects, this.project)

    this.http.post('http://localhost:8081/project/update', { data : this.project, id : this.project.id }).subscribe(res => {
      this.onDelete.emit({ name : 'component', projectIndex : projectIndex, index : key})
    })


  }

  getIndex(comp){
    return this.project.components.map(function(e) { return e.name; }).indexOf(comp.name)
  }

}
