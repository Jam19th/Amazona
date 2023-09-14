import { useEffect, useReducer } from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import Product from "../Components/Product";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import supabase from "../supaBaseClient";

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
        const fetchProducts = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            const { data, error } = await supabase
                .from('products')
                .select()
            if (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
            if (data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            }
        }
        fetchProducts()
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