import { useEffect, useReducer } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "./Product";

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
                        <Row>
                            {products.map(product => (
                                <Col key={product.slug} className="mb-3" sm={6} md={5} lg={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )
                }
            </div>
        </div>
    );
}