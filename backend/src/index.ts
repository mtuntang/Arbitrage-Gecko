import express from 'express';
import arbitrageRoutes from './routes/arbitrageRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', arbitrageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
