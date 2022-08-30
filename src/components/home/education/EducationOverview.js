import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EducationListItem from './EducationListItem';

export default function EducationOverview() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/education.json')
      .then(({ data }) => {
        let projectsArray = [];
        const projectsInJSON = data.education.split(','); // project1, project2 ...
        projectsInJSON.forEach(element => {
          projectsArray[projectsArray.length] = data[element];
        });
        setEducation(projectsArray);
      });
  }, []);
  return (
    <div id="education">
      <div className='heading b m-b-15 m-t-15'>
        <span className='b-accent-border'>Education & Certs</span>
      </div>
      {education.map(edu => (
        <EducationListItem key={edu.name} education={edu} />
      ))}
    </div>
  );
}
