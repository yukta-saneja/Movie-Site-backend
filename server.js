import express from "express"
//express is a js framework, replit automatically installs frameworks upon seeing import statements
//we are using es6(new js) so we added a line in default package.json "type":"module" to identify import statements
//in regular development, we would first install packages, install npm then -> npm install express , in shell then import statement will identify the installed packages
import cors from "cors"
//cors- cross origin resource sharing, avoids error when resources accessed from different host
//these frameworks are js codes written for us that we can directly use to make our work easier


//this is file we created under api folder here, i.e. not a framework
import reviews from "./api/reviews.route.js"

const app = express() //loading express into this variable, used to create web server

app.use(cors()) //using middleware by app.use(), middlewares are programs that express uses to change how things work

app.use(express.json()) //to accept json requests
//get request, post request

app.use("/api/v1/reviews", reviews)
//indicates that the url "/api/v1.." uses reviews route that we created
//v1 is to indicate version of the api

app.use("*", (req, res) => res.status(404).json({ error: "not found" }))
//for any other url-"*" not in "/api/v1/...", the resolve for request will be this json error code

//u can use replit webview url and at end "/api/v1/reviews"  and it will listen to port 8000 for server and be routed as according to our code

//will help in importing this app that we created into the main database
export default app

