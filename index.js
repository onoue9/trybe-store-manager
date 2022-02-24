require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// const handlerErrorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsRouter = require('./routes/productsRoute');
const salesRouter = require('./routes/salesRoute');

app.use('/products', productsRouter);

// app.use(handlerErrorMiddleware);

app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
