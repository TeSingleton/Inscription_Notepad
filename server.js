// require express
const express = require("express");

//  import routes
const htmlRoutes = require("./Routes/htmlRoutes");
const apiRoutes = require("./Routes/apiRoutes");

// inititalize a path variable
const path = require("path");
// initialize `app` with the value of express
const app = express();

// create a port
const PORT = process.env.PORT || 3001;

// require `fs` (file system module)

// create middleware for parsing json

// express.json parses JSON , used tp recognize the incoming Request object as a JSON onbject
app.use(express.json());

// express.urlencoded is a method built in to express to recognize the incoming Request Obj as Strings or Arrays
// extended set to true , allowing the request to return in any data type , not just string or an array
app.use(express.urlencoded({ extended: true }));

// express.static serves static files from the `public` directory(i.e.: HTML CSS and JS files from the public folder )
app.use(express.static("public"));


app.use('/api', apiRoutes);

app.use('/', htmlRoutes);

app.use((req, res) => {
    res.status(404).end();
});
// GET  route for homepage
// GET  route for notes URL

// GET request for retrieving previously stored notes

// POST request to add note

// DELETE request to delete note

// start server and listen to PORT
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});