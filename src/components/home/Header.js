import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className='header-background'>
    <div className='container'>
      <div className='header'>
        <div className='p-4' />
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-12'>
            <center>
              <img
                src={profile[1]}
                alt='Gauravjot Garaya'
                className='img-fluid img-profile'
              />
            </center>
            <div className='p-2' />
          </div>
          <div className='col-lg-9 col-md-8 col-sm-12'>
            <div className='hello b'>Hello,</div>
            <div className='statement'>
              I'm <span className='name-author'>Gauravjot Garaya</span>
            </div>
            {profile[2] &&
              <div className='title'>
                {profile[2]}
              </div>
            }
            <div className='quick-about'>
              <p>
                {profile[0] &&
                  <span>
                    {profile[0]}
                  </span>
                }
                <div className='p-2' />
                <div className='contact-links'>
                  <span>I am @</span>&nbsp;
                  <a
                    href='https://github.com/gauravjot'
                    className='cl-git'
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
                    className='cl-linkedin'
                    title="LinkedIn"
                  >
                    <i className='fab fa-lg fa-linkedin' />
                  </a>
                  <a
                    href='mailto:gauravjot@outlook.com'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='cl-email'
                    title="Email"
                  >
                    <i className='fas fa-lg fa-envelope' />
                  </a>
                  <a
                    href='https://medium.com/@gauravjot'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='cl-medium'
                    title="Medium"
                  >
                    <i className='fa-brands fa-medium' />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
