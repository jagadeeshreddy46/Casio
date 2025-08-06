
import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about">
      <div className="about__container">
        <h1 className="about__title">About Us</h1>
        <p className="about__subtitle">
          At FurnishCo, we believe furniture should inspire comfort, style, and function in every home.
        </p>

        <section className="about__section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, FurnishCo started with a mission: to bring premium, beautifully designed
            furniture to modern households at affordable prices. From small apartments to grand living
            spaces, we design products that blend timeless aesthetics with everyday practicality.
          </p>
        </section>

        <section className="about__section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> Every product is crafted with premium materials and expert workmanship.</li>
            <li><strong>Sustainability:</strong> We source responsibly and design for longevity.</li>
            <li><strong>Customer First:</strong> Our goal is to make your space feel like home.</li>
          </ul>
        </section>

        <section className="about__section">
          <h2>What We Offer</h2>
          <p>
            Whether you’re seeking a statement sofa, a minimalist coffee table, or storage that works as
            beautifully as it looks — we’ve got you covered.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
