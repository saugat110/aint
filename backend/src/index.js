import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'
import session from 'express-session'
import prisma from './utils/prisma.js'
import authRoutes from './routes/authRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import testRoutes from './routes/testRoutes.js'


const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
  }
));

app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: 
  {
    secure:false,
  }
}));

app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/item/', itemRoutes);
app.use('/api/test/', testRoutes);

app.use(errorHandler);


app.listen(3000, () => 
  console.log("Server is running on port 3000")
);



