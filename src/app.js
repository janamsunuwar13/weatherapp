const express = require("express");
const app = express();
//if port is busy then write this
const port = process.env.PORT || 8000;
const path = require("path");
//for partical part
const hbs = require('hbs')



//public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "/templates/views");
const partial_path = path.join(__dirname, "/templates/partials");

//adding hbs engine
app.set('view engine', 'hbs')
// changing defalut views folder in template path
app.set('views', template_path)
// to add partical folder it is like componenet in react
hbs.registerPartials(partial_path);


//connecting the static path
app.use(express.static(static_path))

//routing
//for simple print 
// app.get("", (req, res)=>{
//     res.send("Welcome to janam dai page")
// })
//for hbs print or advance print
app.get("", (req, res)=>{
    res.render("index")
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/weather", (req, res) => {
    res.render("weather")
})
app.get("*", (req, res)=> {
    res.render("404error",{
        errmsg:"404 Page not Found"
    })
})
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})