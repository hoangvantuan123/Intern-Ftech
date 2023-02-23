# GraphQL 

GraphQL đây là một công nghệ hot nhất khi nói đến API phía Server. Nó cực kỳ nhanh để phát triển và nó làm cho việc xây dựng giao diện người dùng trở nên dễ dàng.

## GraphQL có 3 đặc trưng:
- Cho phép Clinet xác định chính xác những dữ liệu cần.
- GraphQL làm cho việc tổng hợp dữ liệu từ nhiều nguồn dễ dàng hơn.
- Sử dụng một type system để khai báo dữ liệu.

`
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
const authors = require('./data/dataAuthor');

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "Author type list",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        author: {
            type: new GraphQLList(BookType),
            resolve: (authors) => {
                return books.filter(book => book.authorId == authors.id);
            }
        }

    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Book type list',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
        authors: {
            type: AuthorType,
            resolve: (books) => {
                return authors.find(authors => authors.id === books.authorId)
            }

        }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root type',
    fields: () => ({
        // Tra cứu: Truy vân đối tượng cần tìm 
        book: {
            type: BookType,
            description: ' A Single Book',
            args: {
                id: { type: GraphQLInt },

            },
            resolve: (paerent, args) => {
                return books.find( book => book.id === args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of all authors',
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            description: 'A Single authors',
            args: {
                id: { type: GraphQLInt },

            },
            resolve: (paerent, args) => {
                return authors.find( author => author.id === args.id)
            }
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
`