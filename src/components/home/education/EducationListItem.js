import React from 'react';

export default function EducationListItem({ education }) {
  return (
    <div className='media m-card'>
      {education.icon &&
          <img className='ml-3 mt-3 align-self-start rounded' src={education.icon} width='64px' height='auto' alt="academic"/>
        }
      <div className='media-body m-card-body'>
        <div className='m-card-title'>
          {education.link ?
            (<a rel='noopener noreferrer'
              target='_blank'
              href={education.link}>
              {education.degree} <i className="fa-solid fa-up-right-from-square"></i>
            </a>)
            : (
              <span>
                {education.degree}
              </span>)
          }
        </div>
        <div className='m-card-subtitle text-muted'>
          {education.credential &&
            <div>
              Credential ID: {education.credential}
            </div>
          }
          <div>
            {education.name}
          </div>
          {education.started &&
            <div>
              {education.started} - {education.finished}
            </div>
          }
          
        </div>
        {education.description &&
          <div>
            <div className='p-1' />
            <div className="m-card-description">
              {education.description}
            </div>
            <div className='p-1' />
          </div>
        }
      </div>
    </div>
  );
}
