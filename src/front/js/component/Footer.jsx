import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center bg-light">
    <div>
      <ul className="wrapper">
        <li className="icon facebook ">
          <a
            href="https://www.facebook.com/"
            className="link-dark"
            target="blank"
          >
            <i className="fab fa-facebook-f " />
          </a>
        </li>
        <li className="icon instagram">
          <a
            href="https://www.instagram.com/"
            className="link-dark"
            target="blank"
          >
            <i className="fab fa-instagram" />
          </a>
        </li>
        <li className="icon github">
          <a
            href="https://github.com/majg1987/proyecto-final"
            className="link-dark"
            target="blank"
          >
            <i className="fab fa-github" />
          </a>
        </li>
        <li className="icon youtube">
          <a
            href="https://www.youtube.com/"
            className="link-dark"
            target="blank"
          >
            <i className="fab fa-youtube" />
          </a>
        </li>
        <li className="icon twitter">
          <a href="https://twitter.com/" className="link-dark" target="blank">
            <i className="fab fa-twitter" />
          </a>
        </li>
      </ul>
    </div>
    <p id="copyright">
      Copyright© 2022 Liberté. <span> All Rights Reserved. </span>{" "}
    </p>
  </footer>
);
