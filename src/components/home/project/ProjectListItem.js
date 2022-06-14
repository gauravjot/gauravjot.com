import React from 'react';

export default function ProjectListItem({ project }) {
  return (
    <div className='media m-card m-b-15 m-card-hoverable'>
      {project.icon &&
          <img className='mr-3 align-self-start rounded' src={project.icon} width='64px' height='auto' alt="project"/>
        }
      <div className='media-body m-card-body'>
        <div className='m-card-title'>
          {project.name}
        </div>
        <div className='m-card-subtitle text-muted'>
          {project.started} 
          { project.finished &&
            <span>
              - {project.finished}
            </span>
          }
        </div>
        <div className='p-1' />
        <div>
          <div className="m-card-description">
            {project.description}
          </div>
          <div className='p-2' />
          {project.github &&
            <span>
              <a
                className='btn btn-outline-light btn-sm'
                rel='noopener noreferrer'
                target='_blank'
                href={project.github}>
                  <i className={'fab fa-lg fa-github'} />
                  &nbsp; View Github
              </a>
              &nbsp;&nbsp;
            </span>
          }
          {project.live &&
            <span>
              <a
                className='btn btn-outline-light btn-sm'
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
          }
        </div>
      </div>
    </div>
  );
}
