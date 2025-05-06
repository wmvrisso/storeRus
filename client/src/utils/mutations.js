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
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

<<<<<<< HEAD
=======
export const UPDATE_CART_QUANTITY = gql`
    mutation UpdateCartQuantity($cartItemId: ID!, $quantity: Int!) {
        updateCartQuantity(cartItemId: $cartItemId, quantity: $quantity) {
            id
            quantity
        }
    }
`;
>>>>>>> 7e158bfcba4144c298f563dd84517521151a5b4e

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

export const DELETE_CART_ITEM = gql `
    mutation DeleteCartItem($cartItemId: ID!) {
        deleteCartItem(cartItemId: $cartItemId) {
            id
            productId
            title
            price
            image
            quantity
        }        
    }
`;
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





