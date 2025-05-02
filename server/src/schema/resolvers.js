// import user model
import User from "../models/User.js";
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
        return { message: "Can't find this user" };
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        return { message: "Wrong password!" };
      }
      const token = signToken(user);
      return { token, user };
    },

    saveProduct: async (_parent, args, context) => {
      // check if user is logged in
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedProducts: args.productData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    deleteProduct: async (_parent, args, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedProducts: { productId: args.productId } } },
        { new: true }
      );
      if (!updatedUser) {
        return { message: "Couldn't find user with this id!" };
      }
      return updatedUser;
    },
  },
};

export default resolvers;
