import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";


export default function SignInScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Sign In
                    </Button>
                </div>
                <div className="mb-3">
                    New Customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>
                        Create Your Account
                    </Link>
                </div>
            </Form>
        </Container>
    )
}