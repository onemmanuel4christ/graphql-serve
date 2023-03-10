const express = require("express")
const {ApolloServer, gql} = require("apollo-server-express")
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require("mongoose")

const MONGODB = 'mongodb+srv://admin-onlyrice:12345@cluster0.9e4w8cf.mongodb.net/graphdb?retryWrites=true&w=majority'

async function startServer(){
const app = express()
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})
await apolloServer.start()
apolloServer.applyMiddleware({app: app})
app.use((req, res) =>{
    res.send("Hello from express")
})
await mongoose.connect(MONGODB, {
    useNewUrlparser: true,
})
console.log('mongoose connected')
app.listen(4000, () => console.log("runnin on port 4000"))
}

startServer()