import { useEffect, useReducer } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
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
            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <h1> Featured Products</h1>
            <div className="products">
                {
                    loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
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