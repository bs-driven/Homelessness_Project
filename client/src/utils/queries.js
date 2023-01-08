import { gql } from "@apollo/client";

export const GET_ME = gql`
    query me {
        user {
            _id
            username
            savedShelter {
                provider
                address
                city
                state
                numberOfBeds
                ageServed
                web_url
            }        
        }
    }
`;

export const FIND_Shelter = gql`
    query saveShelter {
        savedShelter {
            provider
            address
            city
            state
            numberOfBeds
            ageServed
            web_url
        }
    }
`;