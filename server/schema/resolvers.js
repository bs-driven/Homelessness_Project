const { AuthenticationError } = require('apollo-server-express');
const { User, Shelters } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers ={
    Query: {
        users: async () => {
            return User.find();
        },
        
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId})
        },
    },

    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.creaate(args);
            const token = signToken(user);
            return { token , user };
        },
        login: async ( parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!profile) {
                throw new AuthenticationError('Incorrect email');
            }
            const correctPassword = await user.isCorrectPaaaword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            return { token, user };
        },
        removeUser: async (parent, { userId }) =>{
            if(user) {
                return User.findOneAndDelete({ _id: userId});
            }
            throw new AuthenticationError('Log in first');
        },
        addShelter: async (parent, { userId, shelter}) => {
            if (user){
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: {shelters: shelter }},
                    { new: true }
                )
            }
            throw new AuthenticationError('login please');
        },
        removeShelter: async (parent, { userId, shelter}) => {
            if (user) {
                return User.findOneAndUpdate( 
                { _id: userId },
                { $pull: { shelters: shelter }},
                { new: true }
            );
        }
        throw new AuthenticationError('Log in first')
        }


    }
}