import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from backend API and set products state
    fetch('https://72b3368b-21a3-40f1-8a30-36fd0ed525d4.mock.pstmn.io/products')
      .then(response => response.json())
      .then(products => {console.log (products); setProducts(products)});
  }, []);

  return (
    <div className="product-list">
      {products.length === 0 && <p>Loading products...</p>}
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image}/>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
