import express from 'express'; //
import cors from 'cors'; // cors es un middleware que nos permite hacer peticiones desde el frontend
import './database.js'; // importa la conexión a la base de datos
import morgan from 'morgan'; // morgan es un middleware que nos permite ver en consola las peticiones que se hacen al servidor
import cardsRoutes from './routes/cardsRoutes.js'; // importa el router de cardsRoutes.js
import loginRoutes from './routes/loginRoutes.js'; // importa el router de loginRoutes.js

const app = express();
const port = 8000; // puerto en el que se ejecuta el servidor

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); //
app.use('/cards', cardsRoutes); // ruta de cardsRoutes.js
app.use('/login', loginRoutes); // ruta de loginRoutes.js

/*
  API:
  http://localhost:3000/

  End points:
  GET     http://localhost:3000/cards/get-cards
  GET     http://localhost:3000/cards/get-card/:id    --> busca por name
  GET     http://localhost:3000/cards/get-card-id/:id --> busca por id
  POST    http://localhost:3000/cards/post-card
  PUT     http://localhost:3000/cards/put-card/:id
  DELETE  http://localhost:3000/cards/delete-card/:id
  POST    http://localhost:3000/login
*/

app.listen(port, () => console.log(`Server is running on port ${port}`));
