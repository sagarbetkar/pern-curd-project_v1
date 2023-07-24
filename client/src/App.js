import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppRouter from './AppRouter';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


function App() {
  const BASE_URL = "http://localhost:3000";
  return (
    <div>
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
              <Container fluid>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link href={`${BASE_URL}/`}>Home</Nav.Link>
                          <Nav.Link href={`${BASE_URL}/categories`}>Categories</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </header>
      <AppRouter/>
    </div>
  );
}

export default App;
