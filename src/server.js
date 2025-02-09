require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/postList_config');
const auth_routes = require('./routes/auth_routes')
const post_routes = require('./routes/post_routes')
const comment_routes = require('./routes/comment_routes')

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', auth_routes)
app.use('/api/posts', post_routes)
app.use('/api/comments', comment_routes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});