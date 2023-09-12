import Seed_Data from "./Seed_Data";

function App() {
  return (
    <div className="App">
      <header>
        <a href="/">Amazona</a>
      </header>
      <main>
        <h1> Featured Products</h1>
        <div className="products">
          {Seed_Data.products.map(product => (
            <div key={product.slug} className="product">
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-info">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p><strong>${product.price}</strong></p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
