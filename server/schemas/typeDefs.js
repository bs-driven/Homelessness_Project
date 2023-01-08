const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    shelters: [Shelters]
}
type Shelters {
    _id: ID!
    provide: String!
    city: String!
    state: String!
    numberOfBeds: Int
    web_url: String!
}
type Auth{
    token: ID!
    user: [User]
}
type Query {
    user:[User]
    shelter(_id: String): [Shelters]
}
type Mutation{
    login( email: String!, password: String!): Auth
    addUser( userName: String!, email: String!, password: String!): Auth
    removeUser( userName: String!, email: String!, password: String!): Auth
    addShelter( userId: ID!, shelter:String!): User
    removeShelter(userId: ID!, shelter:String!): User
}
`;
module.exports = typeDefs;