import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectListItem from './ProjectListItem';

export default function ProjectsOverview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/projects.json')
      .then(({ data }) => {
        let projectsArray = [];
        const projectsInJSON = data.projects.split(','); // project1, project2 ...
        projectsInJSON.forEach(element => {
          projectsArray[projectsArray.length] = data[element];
        });
        setProjects(projectsArray);
      });
  }, []);

  return (
    <div id="projects">
      <div className='heading b m-b-15 m-t-15'>
        <span className='b-accent-border'>Projects</span>
      </div>

      {projects.map(project => (
        <ProjectListItem key={project.name} project={project} />
      ))}
    </div>
  );
}
