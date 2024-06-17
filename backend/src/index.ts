import express from 'express';
import cors from 'cors';
import arbitrageRoutes from './routes/arbitrageRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/api', arbitrageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
