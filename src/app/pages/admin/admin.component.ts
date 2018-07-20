import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import * as CodeMirror from 'codemirror'

import "codemirror/lib/codemirror";

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';

import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";

import "codemirror/addon/fold/foldcode.js"
import "codemirror/addon/fold/foldgutter.js"
import "codemirror/addon/fold/brace-fold.js"
import "codemirror/addon/fold/indent-fold.js"
import "codemirror/addon/fold/comment-fold.js"
import "codemirror/addon/fold/xml-fold.js"

import "codemirror/addon/dialog/dialog.js"
import "codemirror/addon/scroll/annotatescrollbar.js"
import "codemirror/addon/search/search.js"
import "codemirror/addon/search/searchcursor.js"
import "codemirror/addon/search/matchesonscrollbar.js"
import "codemirror/addon/search/jump-to-line.js"

import { Project } from '../../models/project'
import { AppComponent } from '../../models/app-component'
import * as $ from 'jquery'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('editor') editor : any;

  projects : Array<Project> = new Array<Project>()
  project : Project = new Project()

  //content holder for the code editors
  codeEdit = {
    code : {
      'HTML' : 'htmlmixed',
      'CSS' : 'css',
      'JS' : 'javascript'
    }
  }

  //basic config for editor
  config = {
    lineNumbers: true,
    lineWrapping: true,
    theme : 'ambiance',
    autofocus: true,
    matchBrackets: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-Q" : function(cm){ cm.foldCode(cm.getCursor()); },
      "Alt-F": "findPersistent"
    }
  }

  //dynamic modes
  modes = {
    'HTML' : 'xml',
    'CSS' : 'css',
    'JS' : 'javascript'
  }

  

  //active tab selected
  active = 'HTML'

  tabs = [
    { name : 'HTML', active : true },
    { name : 'CSS', active : false },
    { name : 'JS', active : false }
  ]


  createModels = {
    component : { name : '' },
    project : { name : '' }
  }

  toast = {
    message : 'Updated'
  }


  utilModel = {
    component : ''
  }

  utils = [
    {
      name : 'Create Link',
      icon : 'ti ti-link',
      action : () => {
        this.insertStringInTemplate('<a href="" aria-label=""></a>')
      }
    },
    {
      name : 'Create Image',
      icon : 'ti ti-image',
      action : () => {
        this.insertStringInTemplate('<img src="" alt="">')
      }
    },
    {
      name : 'Create List',
      icon : 'ti ti-list',
      action : () => {
        this.insertStringInTemplate('<ul>\n\t<li></li>\n</ul>')
      }
    },
    {
      name : 'Create Paragraph',
      icon : 'ti ti-paragraph',
      action : () => {
        this.insertStringInTemplate('<p>Some Text..</p>')
      }
    },
    {
      name : 'Create Input',
      icon : 'ti ti-text',
      action : () => {
        this.insertStringInTemplate('<input type="text" name="" value=""/>')
      }
    },
    {
      name : 'Create Texterea',
      icon : 'ti ti-write',
      action : () => {
        this.insertStringInTemplate('<textarea></textarea>')
      }
    },
    {
      name : 'Create Checkbox',
      icon : 'ti ti-check-box',
      action : () => {
        this.insertStringInTemplate('<input type="checkbox" name="" value=""/>')
      }
    },
    {
      name : 'Create Video',
      icon : 'ti ti-video-camera',
      action : () => {
        this.insertStringInTemplate('<video width="320" height="240" controls>\n\t<source src="movie.mp4" type="video/mp4">\n\t<source src="movie.ogg" type="video/ogg">\n\tYour browser does not support the video tag.</video>')
      }
    },
    {
      name : 'Create Audio',
      icon : 'ti ti-volume',
      action : () => {
        this.insertStringInTemplate('<audio controls>\n\t<source src="audio.ogg" type="audio/ogg">\n\t<source src="audio.mpeg" type="audio/mpeg>\n\tYour browser does not support the video tag.</video>')
      }
    }
  ]
 

  constructor(
    private http : Http
  ) { 

  }

  insertStringInTemplate(str) {
      var doc = this.editor.instance.getDoc();
      var cursor = doc.getCursor();

      var pos = {
          line: cursor.line,
          ch: cursor.ch
      }
      doc.replaceRange(str, pos);
  }

  generateComponent(){
    let name = this.utilModel.component
    this.insertStringInTemplate('<'+name+'></'+name+'>')
  }

  showToast(msg : string){
    this.toast.message = msg
    $('.toast').fadeIn(function(){
      setTimeout(function(){
        $('.toast').fadeOut()
      }, 2000)
    })
  }

  ngOnInit() {
    this.getProjects((data) => {
      console.log(data)
      //map sever data to data models
      for(var k in data){
        this.projects.push(this.mapData(data[k]))
      }
      this.setEdit(this.projects[0], null)
      console.log(this.projects)
    })
  }


  mapData(data){
    let project = new Project()
    for(var t in data){
      project[t] = data[t]
    }
    return project
  }


  ngAfterViewInit(){
    this.switchTabs(this.tabs[0])
    this.dropdown()
    this.accordian()

    //editor autocomplete
    this.editor.instance.on("keyup", function (cm, event) {
      if (!cm.state.completionActive &&   /*Enables keyboard navigation in autocomplete list*/
          event.keyCode > 64 && event.keyCode < 91){// only when a letter key is pressed
              CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    })

    this.editor.instance.foldCode(CodeMirror.Pos(0, 0))

  }

  getEditorClass(){
    if(this.active === 'HTML'){
      return 'html-mode'
    }
    if(this.active === 'CSS'){
      return 'css-mode'
    }
    if(this.active === 'JS'){
      return 'js-mode'
    }
  }


  switchTabs(tab){
    this.active = tab.name
    this.editor.instance.setOption('mode', this.modes[tab.name])
    for(var k in this.tabs){
      this.tabs[k].active = false
    }
    tab.active = true
  }


  setEdit(project, comp){

    //disable all
    for(var k in this.projects){
      this.projects[k].active = false
      for(var key in this.projects[k].components){
        this.projects[k].components[key].active = false
      }
    }
    
    if(comp === null){ //if Project
      project.active = true
      this.codeEdit = project 
    }else if(comp){ //if Component
      project.active = true
      comp.active = true
      this.codeEdit = comp 
    }
    this.project = project
    this.switchTabs(this.tabs[0])
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

  isComponentActive(){
    let checks = false
    for(var k in this.project.components){
      var comp = this.project.components[k]
      if(comp.active){
        checks = true
      }
    }
    return checks
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

  accordian(){
    $(function(){
      $('.accordian > span, .accordian-menu > li span').unbind().on('click', function() {
        var ele = $(this).parent()
        var icon = ele.find('.collapse-btn > i').first()
        var toggle = (!ele.attr('toggle') || ele.attr('toggle') === 'false') ? 'true' : 'false'
        ele.attr('toggle', toggle)
        if(toggle === 'false'){
          ele.find('.accordian-menu').first().slideUp(300)
          icon.removeClass('ti-angle-down')
          icon.addClass('ti-angle-up')
        }else{
          ele.find('.accordian-menu').first().slideDown(300)
          icon.removeClass('ti-angle-up')
          icon.addClass('ti-angle-down')
        }
      })
    })
  }

  createProjects(){
    let project = new Project(this.createModels.project.name)
    this.http.post('http://localhost:8081/projects', { data : project }).subscribe(res => {

      this.showToast('Project created successfully!')

      project.id = res.json().data.id //id is important for other operations
      this.projects.push(project)
      this.setEdit(this.projects[this.projects.length - 1], null)
      this.createModels.project.name = ''
      this.dropdown()
      this.accordian()
    })
  }

  createComponent(){

    let comp = new AppComponent(this.createModels.component.name)

    this.project.components.push(comp)
    let update = {
      components : this.project.components
    }

    this.http.post('http://localhost:8081/project/update', { data : update, id : this.project.id }).subscribe(res => {

      this.showToast('Component created successfully!')

      this.createModels.component.name = ''
      let proj = this.mapData(res.json())
    })

  }

  saveProject(){
    this.http.post('http://localhost:8081/project/update', { data : this.project, id : this.project.id }).subscribe(res => {
      this.showToast('Project Saved successfully!')
      this.createModels.component.name = ''
      let proj = this.mapData(res.json())
    })
  }



  delete(project){
    confirm('are you sure you want to delete : ' + project.name + ' ?')
    this.http.post('http://localhost:8081/project/delete', { id : project.id }).subscribe(res => {
      this.showToast('Project Deleted successfully!')
      for(var k=0; k < this.projects.length; k++){
        if(project.id === this.projects[k].id){
          this.projects.splice(k, 1)
          return
        }
      }
    })
  }

  deleteComponent(comp, key){
    confirm('are you sure you want to delete : ' + comp.name + ' ?')
    this.project.components.splice(key, 1)
    this.http.post('http://localhost:8081/project/update', { data : this.project, id : this.project.id }).subscribe(res => {
      this.showToast('Component Deleted successfully!')
      console.log(res)
    })
  }

  getIndex(comp){
    return this.project.components.map(function(e) { return e.name; }).indexOf(comp.name)
  }

  getProjects(callback : Function){
    this.http.get('http://localhost:8081/projects/get').subscribe(res => callback(res.json()))
  }

  preview(){
    window.open('http://localhost:8081/preview/' + this.project.id)
  }


}
