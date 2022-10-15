const dotenv = require('dotenv');

const app = require('./app');

const port = 3000;

dotenv.config({ path: './config.env' });

console.log(process.env);

app.listen(port, () => {
   console.log(`App running at http://localhost:${port}`);
});
