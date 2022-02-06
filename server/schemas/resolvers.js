const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth'); 

const resolvers = {
    Query: {
        /* books: async () => {
            return await Book.find();
        }, */
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                  .select('-__v -password')
                  /* .populate('savedBooks') */
            
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },

        // not sure about this one
        /* books: async (parent, { book, title }) => {
            const params = {};
      
            if (book) {
              params.book = book;
            }
      
            if (title) {
              params.title = {
                $regex: title
              };
            }
      
            return await Book.find(params).populate('book');
        },

        book: async (parent, { bookId }) => {
            return await Book.findById(bookId).populate('book');
        }, */
    },
    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        saveBook: async (parent, { addBook }, context) => {
          console.log(context.user);
          if (context.user) {
            const savedBook = await User.findByIdAndUpdate({ _id: user._id}, { $addToSet: { savedBooks: addBook } });
    
            return savedBook;
          }
    
          throw new AuthenticationError('Not logged in');
        },
        removeBook: async (parent, { bookId }, context) => {
          console.log(context.user);
          if(context.user) {
            const removeBook = await User.findByIdAndUpdate({ _id: user._id}, { $pull: { savedBooks: bookId } });

            return removeBook;
          }
        },
        /* books: async (parent, { book, title }) => {
          const params = {};
    
          if (book) {
            params.book = book;
          }
    
          if (title) {
            params.title = {
              $regex: title
            };
          }
    
          return await Book.find(params).populate('book');
        },

        book: async (parent, { bookId }) => {
          return await Book.findById(bookId).populate('book');
        }, */

        login: async (parent, { username, password }) => {
          const user = await User.findOne({ username });
    
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        }
    }
};
  
module.exports = resolvers;