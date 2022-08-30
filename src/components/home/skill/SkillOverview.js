import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SkillOverview() {
  const [skills, setSkills] = useState([]);
  const [learnings, setLearnings] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/skill.json')
      .then(({ data }) => {
        if (data.showSkills) {
          let skillsArray = [];
          const skillsInJSON = data.skills.split(','); // skill1, skill2 ..
          skillsInJSON.forEach(element => {
            skillsArray.push(data[element]);
          });
          setSkills(skillsArray);
        }
        if (data.showLearning) {
          let learningsArray = [];
          if (data.learning) {
            data.learning.split(',').forEach(element => {
              learningsArray.push(data[element]);
            });
          }
          setLearnings(learningsArray);
        }
      });
  }, []);

  return (
    <div>
      {(skills.length > 0) &&
        <div>
          <div className='heading b m-b-15 m-t-15'>
            <span className='b-accent-border'>I work with</span>
          </div>
          <div>
            {skills.map(skill => (
                <span>
                  {(skill.link) ?
                    <a href={skill.link} className='btn btn-primary btn-accent hover-underline' rel='noopener noreferrer'
                    target='_blank'>{skill.name}</a>
                    :
                    <span className='btn btn-primary btn-accent'>{skill.name}</span>
                  }
                </span>
            ))}
          </div>
        </div>
      }
      
      {(learnings.length > 0) &&
        <div>
          <div className='heading b m-b-15 m-t-15'>
            <span className='b-accent-border'>Learning</span>
          </div>
          {learnings.map(learning => (
            <div>
              <div>
                <a className='btn btn-accent hover-underline'
                  href={learning.link}>
                    {learning.name}
                </a>
              </div>
              <div className='text-sm'>
                {learning.resource}
              </div>
              <div className='p-2'></div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
