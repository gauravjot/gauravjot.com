import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/header.json')
      .then(({ data }) => {
        setProfile([data.aboutme,data.image,data.subtitle]); 
        {/** 0 = about me, 1 = profile picture, 2 = subtitle */}
      });
  }, []);

  return (
    <div className='container'>
      <div className='header'>
        <div className='p-4' />
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-12'>
            <center>
              <img
                src={profile[1]}
                style={{
                  border: '0.3rem #ffffff solid',
                  borderRadius: '50%',
                  boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, 0.2)'
                }}
                alt='Gauravjot Garaya'
                className='img-fluid img-profile'
              />
            </center>
            <div className='p-2' />
          </div>
          <div className='col-lg-9 col-md-8 col-sm-12'>
            <div className='hello b'>Hello,</div>
            <div className='statement b'>
              I'm <span className='accent-color'>Gauravjot Garaya</span>
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
                  <span className='text-muted'>I am @</span>&nbsp;
                  <a
                    href='http://github.com/gauravjot'
                    className='cl-git'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <i className='fab fa-lg fa-github' />
                  </a>
                  <a
                    href='http://linkedin.com/in/gauravjot'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='cl-linkedin'
                  >
                    <i className='fab fa-lg fa-linkedin' />
                  </a>
                  <a
                    href='mailto:gauravjot@outlook.com'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='cl-email'
                  >
                    <i className='fas fa-lg fa-envelope' />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
