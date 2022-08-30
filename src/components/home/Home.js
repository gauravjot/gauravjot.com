import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectsOverview from './project/ProjectsOverview';
import EducationOverview from './education/EducationOverview';
import WorkExperience from './work/WorkExperience';
import Blog from './Blog';

function Home() {
  document.title = 'Home | Gauravjot';

  return (
    <div className='fade-in-2'>
      <Header />
      <div className='container'>
        <Blog />
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <ProjectsOverview />
          </div>
          <div className='col-sm-12 col-md-6'>
            <WorkExperience />
            <EducationOverview />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
