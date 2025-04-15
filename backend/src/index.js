import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'
import session from 'express-session'
import prisma from './utils/prisma.js'


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
    secure:true,
  }
}));

app.use(cookieParser());

// app.use('/api', testRoutes);


// const router = express.Router();
// router.route('/test').get(async(req, res) => {
//   try {
//     const agent = await prisma.agent.create({
//       data:{
//         name: 'Saugat Sthapit',
//         contactInfo: 'saugat@gmail.com',
//         recordOrigin: 'manual'
//       }
//     });
//     console.log(agent);
//   } catch (error) {
//       console.log(error);
//   }
// })

app.use(errorHandler);


app.listen(3000, () => 
  console.log("Server is running on port 3000")
);



