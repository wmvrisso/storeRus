// import user model
import User from "../models/User.js";
import Cart from '../models/Order.js';
// import sign token function from auth
import { signToken } from "../auth.js";

const resolvers = {
  Query: {
    getSingleUser: async (_parent, _args, context) => {
      const foundUser = await User.findOne({ _id: context.user._id });

      if (!foundUser) {
        return null;
      }

      return foundUser;
    },
    me: async (_parent, _args, context) => {
      if (!context.user) return null;
      return await User.findById(context.user._id);
    },
    getCart: async () => {
      try {
        const cartItems = await Cart.find();
        return cartItems;
      } catch(err) {
        console.error('Error fetching cart:', err)
        throw new Error('Failed to fetch cart');
      }
    }
  },

  Mutation: {
    addUser: async (_parent, args) => {
      console.log(args);
      const user = await User.create(args);
      console.log(user);

      if (!user) {
        return { message: "Something is wrong!" };
      }
      const token = signToken(user);
      return { token, user };
    },
    
    login: async (_parent, args) => {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },

    addToCart: async (_, { productData }) => {
      try {
        const existingItem = await Cart.findOne({ productId: productData.productId });

        if (existingItem) {
          existingItem.quantity += 1;
          await existingItem.save();
          return existingItem;
        }

        const newItem = await Cart.create(productData);
        return newItem;
      } catch (err) {
        console.error('Error in addToCart:', err);
        throw new Error('Failed to add item to cart');
      }
    },

    // addToCart: async (_parent, args, context) => {
    //   // check if user is logged in
    //   if (!context.user) {
    //     throw new Error("You need to be logged in!");
    //   }

    //   try {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { savedProducts: args.productData } },
    //       { new: true, runValidators: true }
    //     );
    //     return updatedUser;
    //   } catch (err) {
    //     console.log(err);
    //     return err;
    //   }
    // },

    updateCartQuantity: async (_, { cartItemId, quantity }) => {
      try {
        const updatedItem = await Cart.findByIdAndUpdate(
          cartItemId,
          { quantity },
          { new: true }
        );
        return updatedItem;
      } catch(err) {
        console.error('Error updating quantity:', err);
        throw new Error('Failed to update quantity');
      }
    },

    deleteCartItem: async (_, { cartItemId }) => {
      try{
        await Cart.findByIdAndDelete(cartItemId);
        const updatedCart = await Cart.find();
        return updatedCart;
      } catch (err) {
        console.error('Error removing item:', err);
        throw new Error('Failed to remove item from cart.');
      }
    }

    // deleteProduct: async (_parent, args, context) => {
    //   const updatedUser = await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { $pull: { savedProducts: { productId: args.productId } } },
    //     { new: true }
    //   );
    //   if (!updatedUser) {
    //     return { message: "Couldn't find user with this id!" };
    //   }
    //   return updatedUser;
    // },
  },
};

export default resolvers;