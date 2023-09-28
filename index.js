// app.js
const express = require('express');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const errorHandler = require('./utils/errorHandlers');
// const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db'); // Import konfigurasi koneksi basis data
const cors = require('cors')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const bookRoutes = require('./routers/bookRoute');
const memberRoutes = require('./routers/memberRoute');
const borrowRoutes = require('./routers/borrowRoute');

const app = express();
const PORT = process.env.PORT || 3001;


const swaggerOptions = {
  swaggerDefinition: {
    openapi : '3.0.0', 
    info: {
      title: 'API Peminjaman Buku',
      description: 'Dokumentasi API Anda dengan Swagger',
      version: '1.0.0',
    },
    servers:[{
      url: "http://localhost:3001/"
    }]
  },
  apis: ['./routers/*.js'], // Sesuaikan dengan path ke file yang berisi definisi rute Anda
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Hubungkan ke basis data MongoDB
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())



app.use('/api/', bookRoutes);
app.use('/api/', memberRoutes);
app.use('/api/', borrowRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
