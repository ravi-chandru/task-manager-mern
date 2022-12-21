const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const taskRouter = require('./routes/taskRoute')
const errorHanler = require('./middlewares/error-handler')
const cors = require('cors');
const path = require('path');
const PORT = process.env.port || 5000;

app.use(cors( {origin: '*'}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')));

app.use('/api/v1/tasks',taskRouter);

app.get('*', (_,res) => {
  res.sendFile(path.join(__dirname,'./client/build/index.html'), (err)=>{

      res.status(500).send(err);
  })
})

app.use(errorHanler);

const startServer = () => {

    connectDB(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB');
      app.listen(PORT, () => console.log(`Server started successfully at ${PORT}`))
    })
}

startServer();