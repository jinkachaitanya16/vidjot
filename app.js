const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//load routes

const ideas = require('./routes/ideas');
const user = require('./routes/users');


const app = express();

//handlebars middlebar to update html dynamicaly

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware to capture values entered as a json object

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// methodoverride middleware to perform PUT action.

app.use(methodOverride('_method'));

// mongoose.connect("mongodb://localhost/Vidjot", { useNewUrlParser: true });
// .then(() => console.log("MongoDB connected.."))
// .catch(err => console.log(err)); 


// flash middleware for flash messages.
app.use(flash());



// session middleware

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// custom middleware to flash messages using flash middleware.

app.use(function ( req , res , next ) {
 
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();

});


mongoose.connect("mongodb://localhost/vidjot", {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err => console.log(err));



// app.use(function(req,res,next){
//    req.name="jinka"
//    next();
//    } 
// );

app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req, res) =>{
    const title = "Welcome"
    res.render('index', {
        title : title
    });
});

app.get("/about", (req,res) => {
 res.render('about');
});

app.use('/ideas', ideas);
app.use('/users', user);

const port = 5000;

app.listen( port, () => { 
    console.log(`app is listening on port ${port}` );
});