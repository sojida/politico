import '@babel/polyfill';
import express from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import fs from 'fs';
import officeRoutes from './routes/office.routes';
import partyRoutes from './routes/party.routes';
import authRoutes from './routes/auth.routes';
import voteRoutes from './routes/votes.routes';
import interestRoutes from './routes/interest.routes';
import apiDocs from '../openapi.json';

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());

app.use('/politico', express.static(path.join(__dirname, '../UI')));

app.use(cors({
  credentials: true,
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
}));


app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDocs));

app.get('/', (req, res) => {
  res.send('Welcome to the politico API');
});

// image api
app.get('/api/v1/images/:name', (req, res) => {
  fs.readFile(`./server/uploads/${req.params.name}`, (err, data) => {
    res.status(200).send(data);
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', officeRoutes);
app.use('/api/v1', partyRoutes);
app.use('/api/v1', voteRoutes);
app.use('/api/v1', interestRoutes);


// invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'check documentation, "/docs"' });
});


const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App has started on ${port}`);
});

export default app;
