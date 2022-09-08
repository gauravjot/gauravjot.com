import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/header.json')
      .then(({ data }) => {
        setProfile([data.aboutme,data.image,data.subtitle]); 
        /** 0 = about me, 1 = profile picture, 2 = subtitle */
      });
  }, []);

  return (
    <section className='header'>
      <div className='navbar-background'>
        <div className='container'>
          <nav className="navbar navbar-expand navbar-dark">
              <div className="navbar-nav mr-auto">
                <a className="nav-item nav-link" href="https://medium.com/@gauravjot" rel='noopener noreferrer' target='_blank'>Blog</a>
                <a className="nav-item nav-link" href="#projects">Projects</a>
                <a className="nav-item nav-link" href="#work">Work</a>
                <a className="nav-item nav-link" href="#education">Education</a>
              </div>
              <div className="float-right">
                <div className="th-toggle">
                  <ThemeToggle />
                </div>
              </div>
          </nav>
        </div>
      </div>
      <div className='container'>
        <div className='statement pt-4'>
          I'm <span className='name-author'>Gauravjot Garaya</span>
        </div>
        {/* {profile[2] &&
          <div className='title'>
            {profile[2]}
          </div>
        } */}
        <div className='header-description pt-5'>
            {profile[0] &&
              <p>
                <span>
                  {profile[0]}
                </span>
              </p>
            }
            <div className='pt-5' />
            <div className='contact-links'>
              <a
                href='https://github.com/gauravjot'
                className='cl cl-git'
                rel='noopener noreferrer'
                target='_blank'
                title="Github"
              >
                <i className='fab fa-lg fa-github' />
              </a>
              <a
                href='https://linkedin.com/in/gauravjot'
                rel='noopener noreferrer'
                target='_blank'
                className='cl cl-git'
                title="LinkedIn"
              >
                <i className='fab fa-lg fa-linkedin-in' />
              </a>
              <a
                href='https://medium.com/@gauravjot'
                rel='noopener noreferrer'
                target='_blank'
                className='cl cl-git'
                title="Medium"
              >
                <i className='fa-brands fa-medium' />
              </a>
              <a href='mailto:connect@gauravjot.com' className='btn btn-outline-light ml-2'>Email me <i className="fa-regular fa-envelope"></i></a>
            </div>
        </div>
      </div>
    </section>
  );
}
