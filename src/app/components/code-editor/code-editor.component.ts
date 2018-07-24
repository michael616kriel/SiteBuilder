import { Component, OnInit, ViewChild, Input, AfterViewInit, EventEmitter, Output, OnDestroy  } from '@angular/core';

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
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  
  @ViewChild('tabs') tabs : TabsComponent

  @ViewChild('editorHtml') editorHtml : any
  @ViewChild('editorJs') editorJs : any
  @ViewChild('editorCss') editorCss : any

  @Input('codeEdit') codeEdit = {
    'HTML' : 'htmlmixed',
    'CSS' : 'css',
    'JS' : 'javascript'
  }
  @Output() codeEditChange: EventEmitter<Project> = new EventEmitter<Project>()


  activeEditor : any

  //basic config for editor
  config = {
    lineNumbers: true,
    theme : 'ambiance',
    autofocus: true,
    matchBrackets: true,
    foldGutter: true,
    autoRefresh:true,
    lineWiseCopyCut : false,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-Q" : function(cm){ cm.foldCode(cm.getCursor()) },
      "Alt-F": "findPersistent"
    }
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


  constructor() { 

  }

  ngOnInit() {
    
  }




  ngOnDestroy(){
     this.editorHtml.instance.toTextArea()
     this.editorJs.instance.toTextArea()
     this.editorCss.instance.toTextArea()
  }

  ngAfterViewInit(){

    this.activeEditor = this.editorHtml.instance

    this.editorHtml.instance.setOption('mode', 'xml')
    this.editorCss.instance.setOption('mode', 'css')
    this.editorJs.instance.setOption('mode', 'javascript')

    //editor autocomplete
    this.editorHtml.instance.on("keyup", function (cm, event) {
      if (!cm.state.completionActive &&   /*Enables keyboard navigation in autocomplete list*/
          event.keyCode > 64 && event.keyCode < 91){// only when a letter key is pressed
              CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    })

    //editor autocomplete
    this.editorCss.instance.on("keyup", function (cm, event) {
      if (!cm.state.completionActive &&   /*Enables keyboard navigation in autocomplete list*/
          event.keyCode > 64 && event.keyCode < 91){// only when a letter key is pressed
              CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    })

    //editor autocomplete
    this.editorJs.instance.on("keyup", function (cm, event) {
      if (!cm.state.completionActive &&   /*Enables keyboard navigation in autocomplete list*/
          event.keyCode > 64 && event.keyCode < 91){// only when a letter key is pressed
              CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    })
  }

  supports = ['HTML', 'JS', 'CSS']

  support(supportArray){
    if(!this.tabs){
      return
    }
    this.supports = supportArray
    if(!this.hasSupport('HTML') && !this.hasSupport('CSS') && this.hasSupport('JS')){ //if just js
      this.tabs.selectTabByName('JS')
    }else{
      this.tabs.selectFirst()
    }

  }

  hasSupport(type){
    return this.supports.includes(type)
  }

  toggleWrap(){
    this.toggle('lineWrapping', this.editorHtml.instance)
    this.toggle('lineWrapping', this.editorJs.instance)
    this.toggle('lineWrapping', this.editorCss.instance)
  }

  toggle(property, editor){
    editor.setOption(property, (editor.getOption(property)) ? false : true)
  }


  insertTag(name){
    this.insertStringInTemplate("<"+name+"></"+name+">")
  }

  insertStringInTemplate(str) {
    if(!this.activeEditor){
      return
    }
    var doc = this.activeEditor.getDoc();
    var cursor = doc.getCursor();

    var pos = {
        line: cursor.line,
        ch: cursor.ch
    }
    doc.replaceRange(str, pos);
  }

  onTabClick(tab){
    let editor = null
    switch(tab.label){
      case 'HTML' :
        editor = this.editorHtml.instance
      break
      case 'CSS' :
        editor = this.editorCss.instance
      break
      case 'JS' :
        editor = this.editorJs.instance
      break
    }
    
    this.activeEditor = editor
    setTimeout(function() {
        editor.focus()
        editor.refresh();
    },1)
  }


  codeChange(data){
    let editor = null
    switch(data){
      case 'HTML' :
        editor = this.editorHtml.instance
        editor.setOption('mode', 'xml')
      break
      case 'CSS' :
        editor = this.editorCss.instance
        editor.setOption('mode', 'css')
      break
      case 'JS' :
        editor = this.editorJs.instance
        editor.setOption('mode', 'javascript')
      break
    }
    this.codeEdit[data] = editor.getValue()
  }


}
