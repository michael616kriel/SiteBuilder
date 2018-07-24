export class Service {

    public name : string = 'name'
    public description : string
    public code : { HTML : string, CSS : string, JS : string }
    public active : boolean
    public supports = ['JS']

    constructor(name : string = 'name', framework : string = 'AngularJS'){
        this.name = name

        if(framework === 'AngularJS'){
            this.code = {
                HTML : null,
                CSS : null,
                JS : 'app.service("'+this.name+'", function() { \n\t\n });'
            }
        }else{
            this.code = {
                HTML : null,
                CSS : null,
                JS : null
            }
        }


    }

}
