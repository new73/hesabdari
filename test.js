// test.js
import { getProducts } from './src/dal/db.js';

getProducts().then(products => {
    console.log(products);
});
