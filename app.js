const express = require('express');

const session = require('express-session');

const MemoryStore = require('memorystore')(session);

const bodyParser = require('body-parser');

const createQuizRoutes = require('./routes/create-quiz');

const authRoutes = require('./routes/auth');

const userRoutes = require('./routes/user');

const playQuizRoutes = require('./routes/play-quiz');

const homeRoutes = require('./routes/home');

const app = express();

app.use(session({
    secret: 'mysecret',
    store: new MemoryStore({
        checkPeriod: 86400000
      }),
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(createQuizRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(playQuizRoutes);
app.use(homeRoutes);



app.use((req, res, next) => {
    res.redirect('/');
})

app.listen(3000);