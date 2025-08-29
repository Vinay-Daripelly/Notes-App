import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path'; 
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'; 
import noteRoutes from './routes/noteRoutes'; 

//console.log('SERVER IS LOADING CLIENT ID:', process.env.GOOGLE_CLIENT_ID);

connectDB();
const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running.' });
});

app.post("/name", (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(200).json({ message: `Hello, ${name}!` });
});

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  const clientBuildPath = path.join(__dirname, 'client', 'dist');

  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});