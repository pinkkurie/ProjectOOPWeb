import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import './NavBarrr.css'
function NavBarrr() {
    return(
        <Navbar bg="white" expand="lg" >
        <Container>
          <Navbar.Brand style={{color: '#2F4F4F'}}><Link to={"/home"}>Numerical Method</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Root of equatioins" id="nav-dropdown" >
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Graphical">Graphical Method</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Bisection">Bisection <br/></Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Falsepositions">False position</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Newtonrapson">Newton raphson</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Onepoint">Onepoint Iteration</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Secant">Secant Method</Link></DropdownItem>
              </NavDropdown>
              <NavDropdown  title="Linea Equation" id="nav-dropdown" >
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Cramer">Cramer Rule</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Gass">Gauss Elimination</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Gjordan">Gauss Jordan Elimination</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Inverse">Inverse Matrix</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Lu">LU Decomposition</Link></DropdownItem>
                <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Conjuate">Conjuate Gradient</Link></DropdownItem>
              </NavDropdown>
              <NavDropdown  title="Interpolation" id="nav-dropdown" >
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/NewtonDiv">Newton's divided-differences </Link></DropdownItem>
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Largange">Largange </Link></DropdownItem>
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Spline">Spline </Link></DropdownItem>
             
              </NavDropdown>
              <NavDropdown  title="Regression" id="nav-dropdown" >
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Linear">Linea Regression </Link></DropdownItem>
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/MultipleLinear">MultipleLinear Regression </Link></DropdownItem>
              <DropdownItem><Link style={{color: '#2F4F4F' }} to="/Polynomial">Polynomial Regression </Link></DropdownItem>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default NavBarrr;