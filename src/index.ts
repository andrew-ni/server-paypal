import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';
import * as fs from 'fs';
import * as https from 'https';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const startServer = async (port: number) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req }),
  });

  await createConnection();

  const app = express();
  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'asdfasdfasdfasdf',
      cookie: {
        sameSite: 'none',
        secure: true,
      },
    })
  );

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      // origin: 'https://studio.apollographql.com',
      origin: 'https://localhost:3000',
    },
  });

  // app.listen({ port: port }, () =>
  //   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  // );

  const CERT_PATH = '/home/andrew/mkcert/localhost+2.pem';
  const KEY_PATH = '/home/andrew/mkcert/localhost+2-key.pem';
  https
    .createServer(
      {
        cert: fs.readFileSync(CERT_PATH, 'utf-8'),
        key: fs.readFileSync(KEY_PATH, 'utf-8'),
      },
      app
    )
    .listen(port, () => {
      console.log('server up');
    });
};

startServer(4000);
