import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar GraphQLDateTime

  type User {
    user_id: ID!
    email: String!
  }

  type Post {
    post_id: ID!
    user_id: ID!
    body: String!
    created_at: GraphQLDateTime!
  }

  type Query {
    ping: Boolean
    me: User
    post(post_id: ID!): Post
    posts(user_id: ID!): [Post!]!
    myLikedPosts: [Post!]!
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    createPost(body: String!): Post
    likePost(post_id: ID!): Boolean
  }
`;
