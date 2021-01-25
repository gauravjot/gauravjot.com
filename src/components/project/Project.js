import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../home/Footer';

export default function Project({ match, location }) {
  const [project, setProject] = useState([]);

  useEffect(() => {
    try {
      if (location.state.currentProject) {
        setProject(location.state.currentProject);
        document.title = 'Gauravjot | ' + location.state.currentProject.name;
        return;
      }
    } catch (err) {
      axios
        .get(
          `https://gauravjot-portfolio.firebaseio.com/projects/${
            match.params.project
          }.json`
        )
        .then(({ data }) => {
          setProject(data);
          document.title = 'Gauravjot | ' + data.name;
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function convertToStr(data) {
    let a = String(data);
    return a;
  }

  return (
    <div className='container fade-in-1'>
      <div className='header'>
        <div className='p-2' />

        {/* close icon on top right */}
        <Link to={'/'} className='close' aria-label='Close'>
          <i
            className='fas fa-times'
            style={{
              width: '2rem',
              textAlign: 'center',
              fontSize: '1.5rem',
              height: '2rem',
              padding: '0.3rem'
            }}
          />
        </Link>

        {/* content */}
        <div>
          <div className='p-3' />

          {/* media starts */}
          <div className='media'>

            {/* media image */}
            <img className='mr-3 rounded m-2' src={project.icon} width='100px' height='auto'/>

            {/* media body starts */}
            <div className='media-body'>
              <div className='title accent-color'>{project.name}</div>
              <div className='text-m'>{project.short_description}</div>
              <div className='text-muted'>
                {project.started} 
                {project.finished &&
                  <span>
                    - {project.finished}
                  </span>
                }
              </div>
              <div className='p-2' />
              <div>
                {project.github ? (
                  <span>
                    <a
                      className='btn btn-outline-light'
                      rel='noopener noreferrer'
                      target='_blank'
                      href={project.github}>
                        <i className={'fab fa-lg fa-github'} />
                        &nbsp; View Github
                    </a>
                    &nbsp;&nbsp;
                  </span>
                ) : (
                  ''
                )}
                {project.live ? (
                  <span>
                    <a
                      className='btn btn-outline-light'
                      rel='noopener noreferrer'
                      target='_blank'
                      href={project.live}
                    >
                      {(() => {
                        switch (project.type) {
                          case 'web':
                            return <i className={'fab fa-lg fa-firefox'} />;
                          case 'android':
                            return <i className={'fab fa-lg fa-android'} />;
                          default:
                            return <i className={'fab fa-lg fa-firefox'} />;
                        }
                      })()}
                      &nbsp; View Live
                    </a>
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div> {/* media body ends */}
          </div> {/* media ends*/}

          <div className='p-2' />
          <div>
            <p>{project.description}</p>
          </div>

          <img className='rounded display-art' width='100%' src={project.art}/>
          <div className='p-3' />
          
          {/* section 2 */}
          <div className='row'>
            {/** challenges */}
            <div className='col-lg-8 col-md-12'>
              <div className='m-card'>
                <div className='heading b'>
                  <span className='b-accent-border'>Challenges</span>
                </div>
                <ul className='decimal-list p-3'>
                  {convertToStr(project.challenges).split('&').map((challenge) => (
                    <li style={{paddingLeft:'0.3rem',paddingTop:'0.3rem'}}>{challenge}</li>
                  ))}
                </ul>
                <div className='p-1' />
              </div>
            </div>

            {/** skills */}
            <div className='col-lg-4 col-md-12'>
              <div className='heading b'>
                <span className='b-accent-border'>Skills involving</span>
              </div>
              <div className='p-2' />
              {convertToStr(project.skills).split(',').map((element) => (
                <span className='btn btn-accent'>
                  {element}
                </span>
              ))}
              <div className='p-1' />
            </div>

          </div> {/** section 2 ends */}
        </div>
        <div className='p-4' />
      </div>
      <Footer />
    </div>
  );
}
