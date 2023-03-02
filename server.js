const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// the Express App
const app = express();
const PORT = process.env.PORT || 3002;

//  Handlebars.js engine
const hbs = exphbs.create({ helpers });

// Inform Express.js on which template engine to use
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Passport middleware
app.use(session(sess));

//  Express.js
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Inform Express.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Import routes and give the server access to them.
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// turn on connection to db and server
//app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));
