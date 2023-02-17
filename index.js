//we're using mongoDB database, directly through its site https://www.mongodb.com/atlas/database 
//it provides space in cloud for our database
//make account, create project, database- free shared,create cluster, create username and pw of user of the database
//choose cloud environment, configure IP address, set 0.0.0.0/0 as IP address of replit applications is variable, so we want it to be accessible from anywhere, finish and close
//connect->connect ur application-nodejs, copy the connection string
//for ur environment varialbles(like pw etc.) in replit use the secrets locker

//in this file connect the database and start the server

import app from "./server.js"
import mongodb from "mongodb" //has many js functions library by mongodb developers
import ReviewsDAO from "./dao/reviewsDAO.js"
//Data Access Objects - read about it
//for generic api to client server

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.qvrnu8w.mongodb.net/?retryWrites=true&w=majority`
//`` allow to use js variables within the quotes, as we have inserted variables and pw as above

//running server on 8000 port
const port = 8000

//connecting to database
MongoClient.connect(
  uri,
  //options
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500, //how long a connection can be trying to connect
    useNewUrlParser: true //to use the newer written url parser, always do this

  }
)

  //to catch errors
  .catch(err => {
    console.error(err.stack) //similar to console.log
    process.exit(1) //ending program
  })

  //when no errors, then do this->
  //async functions can run at the same time as other things, or make it wait for other thing to end before it occurs
  //here async waits for client from mongoClient.connect
  .then(async client => {
    await ReviewsDAO.injectDB(client) //to get database connection to ReviewsDAO
    // app.listen starts the server at the port we specified, and a fun with nnothing passing so ()=>
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
