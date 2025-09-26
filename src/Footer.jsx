// src/Footer.jsx
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <div className="text-center">
          <p>&copy; 2025 Ecommerce All rights reserved.</p>
          <p>
            <a href="/about" className="text-white mx-2">About</a> |
            <a href="/contact" className="text-white mx-2">Contact</a> |
            <a href="/privacy" className="text-white mx-2">Privacy Policy</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;