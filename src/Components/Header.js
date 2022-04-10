import { Navbar, Container, Nav } from "react-bootstrap";

function Patient() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Hospital Management</Navbar.Brand>
          <Nav className="me-5">
            
            <Nav.Link href="/inventory">Inventory</Nav.Link>
            <Nav.Link href="/patient">Patient</Nav.Link>
            <Nav.Link href="/doctor">Doctor</Nav.Link>
            <Nav.Link href="/lab">Lab</Nav.Link>
            <Nav.Link href="/receiptionist">Receiptionist</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Patient;
