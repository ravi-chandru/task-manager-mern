const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const taskRouter = require('./routes/taskRoute')
const errorHanler = require('./middlewares/error-handler')
const cors = require('cors');
const PORT = process.env.port || 3000;

app.use(cors( {origin: '*'}));
app.use(express.json());

app.use('/api/v1/tasks',taskRouter);

app.use(errorHanler);

const startServer = () => {

    connectDB(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB');
      app.listen(PORT, () => console.log(`Server started successfully at ${PORT}`))
    })
}

startServer();