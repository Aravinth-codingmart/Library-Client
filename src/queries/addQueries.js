import gql from "graphql-tag";

export const addBookMutation = gql`
mutation AddBook($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        genre
        author{
            name
            age
            id
        }
        id
    }
}
`