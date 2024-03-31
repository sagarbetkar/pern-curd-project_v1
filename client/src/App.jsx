import './App.css'
import Home from "./components/Home";
import Categories from "./components/Categories";
import {Container, Navbar, Nav} from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
              <Container>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="me-auto">
                          <Link className="nav-link" to={`/`}>Home</Link>
                          <Link className="nav-link" to={`/categories`}>Categories</Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </header>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/categories" element={<Categories />} /> 
      </Routes>
    </div>
  )
}

export default App
