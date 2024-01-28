import {
  getOffsetAndLimitFomReq,
  getProductsFeatured,
  getSearchProduct,
  getSearchProductId,
} from './controllers/product';
import {syncAirableInAlgolia} from './controllers/sync';
import express, {Response, Request} from 'express';
import cors from 'cors';
import {createOrdersPreference} from './controllers/order';

const port = '3000';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/sync/algolia', async (req: Request, res: Response) => {
  const syncResponse = await syncAirableInAlgolia();
  res.status(200).json(syncResponse);
});

app.get('/featured', async (req: Request, res: Response) => {
  const featured = await getProductsFeatured();
  res.json(featured);
});

app.get('/products', async (req, res) => {
  const {q,type,price} = req.query;
  const {finalOffset, finalLimit} = getOffsetAndLimitFomReq(req);
  const products = await getSearchProduct(q as string,type,price, finalLimit, finalOffset);
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const {id} = req.params;
  const product = await getSearchProductId(id);
  res.json(product);
});

app.post('/order', async (req, res) => {
  const data = await createOrdersPreference(req.body);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
