export class AppComponent {

    public name : string = 'name'
    public framework : string 
    public description : string
    public code : { HTML : string, CSS : string, JS : string }
    public active : boolean
    public supports = ['HTML', 'JS', 'CSS']

    constructor(name : string = 'name', framework : string = 'AngularJS'){
        this.name = name
        this.framework = framework

        if(framework === 'AngularJS'){
            this.code = {
                HTML : '<script type="text/ng-template" id="'+this.name+'.html"></script>',
                CSS : this.name+' {}',
                JS : 'app.directive("'+this.name+'", function() {\n\treturn {\n\t\t  templateUrl : "'+this.name+'.html"\n\t };\n});'
            }
        }else{
            this.code = {
                HTML : '<script type="text/x-handlebars-template" id="'+this.name+'"></script>',
                CSS : null,
                JS : null
            }
        }


    }

}



