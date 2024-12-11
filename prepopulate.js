
const pool = require('./config/db');
const sampleProducts = require('./data/sampleProducts');

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  const query = 'INSERT INTO products (name, description, volume, quantity, price, image, stock) VALUES ?';
  const values = sampleProducts.map(product => [product.name, product.description,product.volume, product.quantity, product.price, product.image, product.stock]);

  connection.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error inserting products:', err);
    } else {
      console.log('Products inserted successfully');
    }
    connection.release();
  });
});
