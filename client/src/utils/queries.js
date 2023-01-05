import { gql } from "@apollo/client";

export const GET_ME = gql`
    query me {
        me {
            _id
            name        
        }
    }
`;

export const FIND_Shelter = gql`
    query saveShelter {
        saveShelter {
            name
            link
        }
    }
`;