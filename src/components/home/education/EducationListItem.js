import React from 'react';

export default function EducationListItem({ education }) {
  return (
    <div className='media m-card'>
      {education.icon &&
          <img className='mr-3 align-self-start rounded' src={education.icon} width='64px' height='auto'/>
        }
      <div className='media-body m-card-body'>
        <div className='m-card-title'>
          {education.link ?
            (<a rel='noopener noreferrer'
              target='_blank'
              href={education.link}>
              {education.degree}
            </a>)
            : (
              <span>
                {education.degree}
              </span>)
          }
        </div>
        <div className='m-card-subtitle'>
          {education.credential &&
            <div className='text-muted'>
              Credential ID: {education.credential}
            </div>
          }
          <div className='text-muted'>
            {education.name}
          </div>
          <div className='text-muted'>
            {education.started} - {education.finished}
          </div>
          <div>
            {education.description}
          </div>
        </div>
      </div>
    </div>
  );
}
