import * as express from 'express';
import router from './server/routes'
const app = express();



app.use("/", router);

app.listen(8000, () => {
  console.log('App listening on port 8000!')
});