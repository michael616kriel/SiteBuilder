import { AppComponent } from './app-component'

export class Project {
    
    id : string
    public name : string
    public description : string = 'project description'
    public code : { HTML : string, CSS : string, JS : string }
    public components : Array<AppComponent>
    public active : boolean

    constructor(name : string = 'project'){
        this.name = name
        this.components = new Array<AppComponent>()

        let formatted = name.toLowerCase().replace(' ', '_')
        this.code = {
            HTML : '<html ng-app="'+formatted+'">\n\t<head></head>\n\t<body ng-controller="'+formatted+'Ctrl"></body>\n</html>',
            CSS : '.app { }',
            JS : 'var app = angular.module("'+formatted+'", [])\n\n\napp.controller("'+formatted+'Ctrl", function($scope){})'
        }
    }

}
