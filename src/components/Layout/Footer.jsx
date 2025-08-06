import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__grid">
          <section className="footer__col">
            <div className="footer__brand">
              <div className="footer__brandMark" aria-hidden="true">F</div>
              <span className="footer__brandName">FurnishCo</span>
            </div>
            <p className="footer__desc">
              Quality furniture for modern living. Transform your space with our carefully curated collection of premium furniture pieces.
            </p>
            <div className="footer__social" aria-label="Social media">
              <a
                href="https://facebook.com"
                aria-label="FurnishCo on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialLink"
                title="Facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://twitter.com"
                aria-label="FurnishCo on Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialLink"
                title="Twitter"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com"
                aria-label="FurnishCo on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialLink"
                title="Instagram"
              >
                <Instagram />
              </a>
              <a
                href="https://youtube.com"
                aria-label="FurnishCo on YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialLink"
                title="YouTube"
              >
                <Youtube />
              </a>
            </div>
          </section>

          <nav className="footer__col" aria-label="Quick links">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__list">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/products" className="footer__link">Products</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
              <li><Link to="/faq" className="footer__link">FAQ</Link></li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Categories">
            <h3 className="footer__heading">Categories</h3>
            <ul className="footer__list">
              <li><Link to="/products?category=sofas" className="footer__link">Sofas</Link></li>
              <li><Link to="/products?category=chairs" className="footer__link">Chairs</Link></li>
              <li><Link to="/products?category=tables" className="footer__link">Tables</Link></li>
              <li><Link to="/products?category=beds" className="footer__link">Beds</Link></li>
              <li><Link to="/products?category=storage" className="footer__link">Storage</Link></li>
            </ul>
          </nav>

          <section className="footer__col" aria-label="Contact information">
            <h3 className="footer__heading">Contact Us</h3>
            <ul className="footer__contact">
              <li className="footer__contactItem">
                <MapPin className="footer__icon" aria-hidden="true" />
                <span>123 Sai Nagar Anantapur,AP-India </span>
              </li>
              <li className="footer__contactItem">
                <Phone className="footer__icon" aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="footer__contactItem">
                <Mail className="footer__icon" aria-hidden="true" />
                <span>info@furnishco.com</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2024 FurnishCo. All rights reserved.</p>
          <nav className="footer__policies" aria-label="Legal policies">
            <Link to="/privacy" className="footer__policyLink">Privacy Policy</Link>
            <Link to="/terms" className="footer__policyLink">Terms of Service</Link>
            <Link to="/returns" className="footer__policyLink">Return Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
