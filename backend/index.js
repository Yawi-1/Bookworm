const express = require('express');
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan')
const db = require('./config/db')
const authRoutes = require('./routes/auth.routes')
const booksRoutes = require('./routes/book.routes')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'))
app.use('/api/auth',authRoutes)
app.use('/api/books',booksRoutes)




app.get('/',(req,res)=>{
    res.send('Hello from Bookworm');
})


app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`);
    db();
})