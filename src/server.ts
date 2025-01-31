require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/shopDb.config.ts')
const productRoutes = require('./routes/product.routes.ts')


app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


