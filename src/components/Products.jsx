import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.api.getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div>
      {products.length === 0 ? (
        <p>هیچ محصولی موجود نیست.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.Id}>
              {p.ProductName} - {p.Price} تومان - موجودی: {p.Stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
