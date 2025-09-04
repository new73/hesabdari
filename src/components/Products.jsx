import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.api.getProducts().then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>لیست محصولات شما</h2>
      <ul>
        {products.map(p => (
          <li key={p.Id}>{p.ProductName} - {p.Price} تومان</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
