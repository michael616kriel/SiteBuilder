import { AppComponent } from './app-component'
import { Service } from './service'
export class Project {
    
    id : string
    public name : string
    public framework : string
    public description : string = 'project description'
    public code : { HTML : string, CSS : string, JS : string }
    public components : Array<AppComponent>
    public services : Array<Service>
    public active : boolean
    public supports = ['HTML', 'JS', 'CSS']

    constructor(name : string = 'project', framework : string = 'AngularJS'){
        this.name = name
        this.components = new Array<AppComponent>()
        this.services = new Array<Service>()
        this.framework = framework
        let formatted = name.toLowerCase().replace(' ', '_')
        if(framework === 'AngularJS'){
            this.code = {
                HTML : '<html ng-app="'+formatted+'">\n\t<head></head>\n\t<body ng-controller="'+formatted+'Ctrl"></body>\n</html>',
                CSS : '.app { }',
                JS : 'var app = angular.module("'+formatted+'", [])\n\n\napp.controller("'+formatted+'Ctrl", function($scope){})'
            }
        }else{
            this.code = {
                HTML : '<html>\n\t<head></head>\n\t<body></body>\n</html>',
                CSS : '.app { }',
                JS : 'var app = function(){}'
            }
        }
    }

}
