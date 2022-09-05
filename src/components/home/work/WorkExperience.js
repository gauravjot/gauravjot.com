import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WorkExperience() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/work.json')
      .then(({ data }) => {
        let workArray = [];
        if (data.work) {
          data.work.split(',').forEach(element => {
            workArray.push(data[element]);
          });
        }
        setWorks(workArray);
      });
  }, []);

  return (
    <div>
        <div className='heading b m-b-15 m-t-15'>
            <span className='b-accent-border'>Work Experience</span>
        </div>
        {works.map((work, index) => (
            <div className='media m-card ml-100' key={index}>
                <div className='workfinishdate'>{work.startlabel}</div>
                <div className={(index === works.length - 1) ? 
                        'media-body m-card-body':
                        'work-card media-body m-card-body'}>
                    <div className='m-card-title'>{work.role}</div>
                    <div className='m-card-subtitle text-muted'>
                        {(work.link) ?
                            <a href={work.link} rel='noopener noreferrer'
                            target='_blank'>{work.company} <i className="fa-solid fa-up-right-from-square"></i></a>
                            :
                            <span>{work.company}</span>
                        }
                    </div>
                    <div className='m-card-subtitle text-muted'>{work.started} - {work.ended}</div>
                </div>
            </div>
        ))}
    </div>
  );
}
