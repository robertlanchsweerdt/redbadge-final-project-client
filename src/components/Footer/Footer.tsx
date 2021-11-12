import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <Container className='d-md-flex justify-content-between py-4 text-center text-md-start'>
        <div id='office'>
          <h6>Office:</h6>
          <address>
            Bedrock Hills Home Owners Association
            <br />
            P.O. Box 1188
            <br />
            Granger, IN 46530
            <a href='tel:15745555555' className='footer-link'>
              (574) 555-5555
            </a>
            <a
              href='mailto: robert.lanchsweerdt@gmail.com'
              className='footer-link'
            >
              bedrockhillshoa@email.com
            </a>
          </address>
        </div>
        <div id='office-hours' className='mt-3 mt-md-0'>
          <h6>Office Hours:</h6>
          <ul className='list-unstyled'>
            <li>Mon thru Friday: 9am to 6pm</li>
            <li>Saturday: 10am to 3pm</li>
            <li>Sunday: closed</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
