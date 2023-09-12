import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export default function ProductScreen() {
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: false,
        error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const response = await fetch(`/api/products/${slug}`)
                const data = await response.json()
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        fetchData()
    }, [slug])

    return (
        loading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>{error}</div>
        ) : (
            <div>
                <Row>
                    <Col md={6}>
                        <img
                            className="large"
                            src={product.image}
                            alt={product.name}
                        />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                    <Helmet>
                        <title>{product.name}</title>
                    </Helmet>
                                <h1>{product.name}</h1>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description:
                                <p>{product.description}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>

                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            ${product.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ?
                                                <Badge bg="success">In Stock</Badge>
                                                :
                                                <Badge bg="danger">Out of Stock</Badge>
                                            }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button className="btn btn-primary" type="button">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Col>
                </Row>
            </div>
        )
    );
}