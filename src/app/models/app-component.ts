export class AppComponent {

    public name : string = 'name'
    public description : string
    public code : { HTML : string, CSS : string, JS : string }
    public active : boolean

    constructor(name : string = 'name'){
        this.name = name
        this.code = {
            HTML : '<script type="text/ng-template" id="'+this.name+'.html"></script>',
            CSS : this.name+' {}',
            JS : 'app.directive("'+this.name+'", function() {\n\treturn {\n\t\t  templateUrl : "'+this.name+'.html"\n\t };\n});'
        }
    }

}



