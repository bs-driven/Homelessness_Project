import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SHELTER = gql`
    mutation addShelter($profileId: ID!){
        addShelter(profileId: $profileId){
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
    mutation removeShelter($profileId: ID!){
        removeShelter(profileId: $profileId){
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
    mutation newHome($profileId: ID!){
        newHome(profileId: $profileId){
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