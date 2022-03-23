import * as bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';
import { Like } from './entity/Like';
import { Post } from './entity/Post';
import { User } from './entity/User';

const checkLoggedInSession = (req: any) => {
  console.log(req.session.userId);
  if (!req.session.userId) throw new Error('Not logged in');
};

export const resolvers: IResolvers = {
  Query: {
    ping: () => {
      return true;
    },
    me: (_, __, { req }) => {
      checkLoggedInSession(req);
      return User.findOne(req.session.userId);
    },
    post: (_, { post_id }) => {
      return Post.findOne(post_id);
    },
    posts: (_, { user_id }) => {
      return Post.find({ user_id: user_id });
    },
    myLikedPosts: async (_, __, { req }) => {
      checkLoggedInSession(req);
      const likes = await Like.find({
        where: { user_id: req.session.userId },
        relations: ['post'],
      });
      return likes.map(like => like.post);
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('Email is already in use');

      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.create({
        email,
        hashed_password: hashedPassword,
      }).save();
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Invalid login');

      const valid = await bcrypt.compare(password, user.hashed_password);
      if (!valid) throw new Error('Invalid login');

      req.session.userId = user.user_id;

      return user;
    },
    createPost: async (_, { body }, { req }) => {
      checkLoggedInSession(req);
      return await Post.create({
        body,
        created_at: new Date(),
        user_id: req.session.userId,
      }).save();
    },
    likePost: async (_, { post_id }, { req }) => {
      checkLoggedInSession(req);
      await Like.create({
        user_id: req.session.userId,
        post_id,
      }).save();
      return true;
    },
  },
};
