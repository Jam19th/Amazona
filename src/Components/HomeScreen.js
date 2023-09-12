import { Link } from "react-router-dom";
// import Seed_Data from "../Seed_Data";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const [products, setProducts] = useState([])

    // Fetch products from backend
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/products")
            const data = await response.json()
            setProducts(data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1> Featured Products</h1>
            <div className="products">
                {products.map(product => (
                    <div key={product.slug} className="product">
                        <Link to={`/product/${product.slug}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <div className="product-info">
                            <Link to={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>
                            <p><strong>${product.price}</strong></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}