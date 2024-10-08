const express = require ('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require('./routes/user');
const restaurantsRoutes = require('./routes/restaurant');
const commentsRoutes = require('./routes/comment');
const favoritesRoutes = require('./routes/favorite');



const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',restaurantsRoutes);
app.use('/api',commentsRoutes);
app.use('/api',favoritesRoutes);
    


//routes
app.get("/", (req, res) => {
    res.send('Welcome to Tattler!');
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log('Connected to MongoDB'))
    .catch((error)=>(console.error(error)));

app.listen(port,()=>{console.log(`Server listening on port ${port}`);});