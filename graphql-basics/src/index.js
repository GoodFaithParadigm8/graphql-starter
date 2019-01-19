import { GraphQLServer } from 'graphql-yoga';

import db from './db'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
import Mutation from './resolvers/Comment'
import Query from './resolvers/Query'
import Post from './resolvers/Post'


const resolvers = {
    User,
    Comment,
    Mutation,
    Query,
    Post
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db: db
    }
})

server.start(() => {
    console.log('The server is running on port 4000!')
})

//