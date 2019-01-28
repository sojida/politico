import '@babel/polyfill';
import express from 'express';
import routes from './routes/routes';
import authRoutes from './routes/auth.routes';
import officeRoutes from './routes/office.routes';

const app = express();

// middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the politico API');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', officeRoutes);
app.use('/api/v1', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App has started on ${port}`);
});

export default app;
