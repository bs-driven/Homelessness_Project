import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(userName: $name, email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_SHELTER = gql`
    mutation addShelter($userId: ID!){
        addShelter(userId: $userId){
            token
            profile {
                _id
                provider
                address
                city
                state
            }
        }
    }
`;

export const REMOVE_SHELTER =gql`
    mutation removeShelter($shelterId: ID!){
        removeShelter(shelterId: $shelterId){
            token
            profile {
                _id
                shelter{
                _id
                provider
                }
            }
        }
    }
`;

export const NEW_SHELTER = gql`
    mutation newshelter($shelterId: ID!){
        newshelter(shelterId: $shelterId){
            token
            shelter {
                _id
                provider
                address
                city
                state
            }
        }
    }
    `;