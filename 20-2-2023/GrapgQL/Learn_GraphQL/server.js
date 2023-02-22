const { request } = require('express');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');



/* const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello World xin chao'


            }
        })
    })
})
 */
const books = require('./data/dataBook')

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Book type list',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root type',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => books
        }
    })
})


const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true

}))

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})