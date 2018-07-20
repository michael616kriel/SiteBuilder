const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const rethink = require('rethinkdb')


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
// app.use(express.static(__dirname + '/../src'))
// app.use(express.static(__dirname + '/../src/admin'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


function updateProject(id, data, callback){
    rethink.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        console.log('connected')
        if(err) throw err;
        rethink.db('siteBuilder').table('projects').get(id).update(data).run(conn, (err, res) => {
          if(err) throw err;
          console.log('project Updated')
          callback({ 'status' : 'updated' });
        })
    })
}

function deleteProject(id, callback){
    rethink.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        console.log('connected')
        if(err) throw err;
        rethink.db('siteBuilder').table('projects').get(id).delete().run(conn, (err, res) => {
          if(err) throw err;
          console.log('project deleted')
          callback({ 'status' : 'deleted' });
        })
    })
}

function createProject(data, callback){
    rethink.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        console.log('connected')
        if(err) throw err;
        rethink.db('siteBuilder').table('projects').insert(data).run(conn, (err, res) => {
          if(err) throw err;
          console.log(res)
          callback({ 'status' : 'created', data : { id : res.generated_keys[0] } });
        })
    })
}

function getProjects(callback){
    rethink.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        console.log('connected')
        if(err) throw err;
        rethink.db('siteBuilder').table('projects').run(conn, (err, cursor) => {
          if(err) throw err;
          cursor.toArray(function(err, result) {
            if (err) throw err;
                //console.log(JSON.stringify(result, null, 2));
                callback(JSON.stringify(result, null, 2));
            })
        })
    })
}

function getPreview(id, callback){
    rethink.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        console.log('connected')
        if(err) throw err;
        rethink.db('siteBuilder').table('projects').get(id).run(conn, (err, res) => {
          if(err) throw err;
          console.log('project Preview requested')
          callback(res);
        })
    })
}

app.set('views', __dirname + '/preview');
app.set('view engine', 'ejs');
app.get('/preview/:id', function(req, res){
    if(req.params.id){
        getPreview(req.params.id, (data) => {
            if(data){
                res.render('index', { data : data })
            }else{
                res.status(404).send('Not found');
            }
        })
    }else{
        res.status(404).send('Not found');
    }
})


app.post('/projects', function(req, res) {
    createProject(req.body.data, (result) => {
        res.send(result)
    })
})

app.post('/project/update', function(req, res) {
    updateProject(req.body.id, req.body.data, (result) => {
        res.send(result)
    })
})

app.post('/project/delete', function(req, res) {
    deleteProject(req.body.id, (result) => {
        res.send(result)
    })
})

app.get('/projects/get', function(req, res) {
    getProjects((result) => {
        res.send(result)
    })
})

  
// Start the app by listening on the default
app.listen(8081)
console.log('Running on : 8081')