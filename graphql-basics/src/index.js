import { GraphQLServer } from 'graphql-yoga';


// Demo user data
// const generator = (schema, min = 1, max) => {
//     max = max || min
//     return Array.from({ length: faker.random.number({ min, max }) }).map(() => Object.keys(schema).reduce((entity, key) => {
//         entity[key] = faker.fake(schema[key])
//         return entity
//     }, {}))
// }

// const userSchema = {
// id: '{{random.uuid}}',
// name: '{{name.findName}}',
// email: '{{internet.email}}',
// age: '{{random.number}}'
// }

// const postSchema ={
// id: `{{random.uuid}}`,
// title: `{{lorem.sentence}}`,
// body: `{{lorem.paragraph}}`,
// published: `{{random.boolean}}`
// }

// const posts = generator(postSchema, 5, 10)
// const users = generator(userSchema, 5, 10)


const users =  [
    {
        id: "1",
        name: "Jason",
        email: "jason@goodfaith.church",
        age: 37
    },
    {
        id: "2",
        name: "Erica",
        email: "erica@goodfaith.church",
        age: 35
    },
    {
        id: "3",
        name: "Nicky",
        email: "nikki@goodfaith.church",
        age: 34
    }
]


const posts = [
    {
        id: "11",
        title: "GraphQl 101",
        body: "This is how to use GraphQL...",
        published: true,
        author: "1"
    },
    {
        id: "12",
        title: "GraphQl 201",
        body: "This is an advanced GraphQL post...",
        published: false,
        author: "1"
    },
    {
        id: "13",
        title: "Programming Music",
        body: "",
        published: false,
        author: '2'
    },
]

const comments = [
    {
        id: "21",
        text: "Great Post 1",
        author: "1",
        post: "11"
    },
    {
        id: "22",
        text: "Great Post 2",
        author: "3",
        post: "11"
    },
    {
        id: "23",
        text: "Great Post 3",
        author: "3",
        post: "12"

    },
    {
        id: "24",
        text: "Great Post 4",
        author: "2",
        post: "13"
    }
]


// Type Definitions {schema}
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]
    Post: User!
    Comment: User!
    comments(query: String): [Comment!]!
  }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]
        comments: [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        posts: Post!
    }
`
// Resolvers
const resolvers = {
    Query: {
        posts(parent, args, ctx, info){
            if (!args.query) {
                return posts
            }
            return posts.filter((posts) => {
                const isTitleMatch = posts.title.toLowerCase().includes(args.query.toLowerCase(args.query.toLowerCase()))
                const isBodyMatch = posts.body.toLowerCase().includes(args.query.toLowerCase(args.query.toLowerCase()))
                return isTitleMatch || isBodyMatch
            })
        },
        users(parent, args, ctx, info){
            if (!args.query) {
                return users
            }
            return users.filter((users)=> {
                return users.name.toLowerCase().includes(args.query.toLowerCase(args.query.toLowerCase()))
            })
        },
        comments(parent, args, ctx, info){
                return comments
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        posts(parent, args, ctx, infor){
            return posts.find((post) => {
                return post.id ===  parent.post
            })
        }
    },
    Post: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
                })
            }
        },
    User: {
        posts(parent, args , ctx, info){
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) =>{
                return comment.author === parent.id
            })
        }
    }
}



const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))


/**
 *  Intro to Graphql and setting up ES6 babel-node import/export
 */

// import myCurrentlocation, { getGreeting, message, name } from './myModule';
// import addition, { subtract } from './math'


// console.log(addition(4, 5));
// console.log(subtract(10, 2));


// console.log(message);
// console.log(name);
// console.log(myCurrentlocation);
// console.log(getGreeting("Bandit"));

/**
 * Graphql's github introduction example 
 */
// // typeDef
// hello(name: String!)
// // Resolver
// hello: (_, { name, }) => `Hello ${name || 'World'}`,


//  Scalular Values - String, Boolean, Int, Float, ID

/**
 * Graphql typeDef and resolvers example 
 */

// // typeDef
// greeting(name: String!, position: String!): String!
// add(numbers: [Float!]!): Float!
// grades: [Int!]!

// // Resolvers
// greeting(parent, args, ctx, info){
//     if (args.name && args.position){
//         return `Hello, ${args.name}. You are my favorite ${args.position}`
//     } else {
//         return "Hello!"
//     } 
// },
// grades(parent, args, ctx, info){
//     return [99, 80, 82]

// },
// add(parent, args, ctx, info){
//     if (args.numbers.length === 0){
//         return 0
//     }
//     // [1, 5, 3, 2]
//     return args.numbers.reduce((accumulator, currentValue) => {
//         return (accumulator + currentValue) / args.numbers.length
//     })
// },


