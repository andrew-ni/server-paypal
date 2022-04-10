// import * as fs from 'fs';
// import * as https from 'https';
import * as paypal from '@paypal/checkout-server-sdk';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config();
const app = express();
const port = 4000;

app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const Environment =
  process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(process.env.PAYPAL_CLIENT_ID as string, process.env.PAYPAL_CLIENT_SECRET as string)
);

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', {
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  });
});

app.get('/ping', (req: express.Request, res: express.Response) => {
  res.send({ data: 'hello' });
});

app.post('/create-order', async (req, res) => {
  console.log('CREATE ORDER');
  console.log(paypalClient, req, res);
});

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
