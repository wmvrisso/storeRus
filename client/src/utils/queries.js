import { gql } from '@apollo/client';

export const GET_CART = gql`
    query GetCart {
        getCart{
            id
            productId
            title
            price
            image
            quantity
        }
    }
`;