import { gql } from "@apollo/client";

export const QUERY_USER = gql`
    query user {
        user {
            _id
            username
            email
            shelters {
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
    query shelters($_id: String) {
        shelters(_id: $id) {
            _id
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