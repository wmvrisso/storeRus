import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
        
    }
`;

export const ADD_USER = gql`
    mutation addUser($input: UserInput!){
        addUser(input: $input) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation addToCart($productData: ProductInput!) {
        addToCart(productData: $productData) {
            id
            productId
            title
            price
            image
            quantity
        }
    }
`;

export const REMOVE_FROM_CART = gql `
    mutation RemoveFromCart($cartItemId: ID!) {
        removeFromCart(cartItemId: $cartItemId) {
            id
        }        
    }
`
export const ADD_PROFILE = gql`
  mutation addProfile($input: ProfileInput!) {
    addProfile(input: $input) {
      token
      profile {
        _id
        name
      }
    }
  }
`;





