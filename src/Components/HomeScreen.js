import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false, error: '' }
        case 'FETCH_FAIL':
            return { ...state, products: [], loading: false, error: action.payload }
        default:
            return state;
    }
}

export default function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: false,
        error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const response = await fetch("/api/products")
                const data = await response.json()
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1> Featured Products</h1>
            <div className="products">
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        products.map(product => (
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
                        ))
                    )}
            </div>
        </div>
    );
}