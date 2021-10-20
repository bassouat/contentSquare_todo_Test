/**
 * Module dependencies.
 */
const express = require('express');
const routes = require('./routes');
const todo = require('./routes/todo');
const app = express();

const http = require('http');
const path = require('path');

const bodyParser = require('body-parser');

//MongoDB
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://basseydou:reussite2021@cluster0.eor5a.mongodb.net/TodoDB?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());


const cors = require('cors');




//Middleware pour les headers



app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/public');
  app.engine('.html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(cors());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});



app.get('/views/:name', routes.views);

app.get('/api/todos', todo.findAll);
app.get('/api/todos/:id', todo.findById);
app.post('/api/todos', todo.addTodo);

app.put('/api/todos/:id', todo.updateTodo);
app.delete('/api/todos/:id', todo.deleteTodo);


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
