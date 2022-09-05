import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectsOverview from './project/ProjectsOverview';
import EducationOverview from './education/EducationOverview';
import WorkExperience from './work/WorkExperience';
import SkillOverview from './skill/SkillOverview';
import Blog from './Blog';

function Home() {
  document.title = 'Home | Gauravjot';
  
  //Get the button
  let mybutton = React.useRef();

  // When the user scrolls down 20px from the top of the document, show the button
  React.useEffect(() => {
    const handleScroll = () => {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          mybutton.current.style.display = "block";
        } else {
          mybutton.current.style.display = "none";
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [])

  

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className='fade-in-2'>
      <Header />
      <div className='container'>
        {/* <Blog />
        <div className="squiggle mt-5 mb-5"></div> */}
        <div className="squiggle mt-5 mb-5" id="projects"></div>
        <ProjectsOverview />
        <div className="squiggle mt-5 mb-5" id="work"></div>
        <div className='position-relative'>
          <WorkExperience />
        </div>
        <div id="education" className="mb-5"></div>
        <EducationOverview />
        <div className="squiggle mt-5 mb-5"></div>
        <SkillOverview />
        <div className="mb-5"></div>
        {/* <div className='row'>
          <div className='col-sm-12 col-md-6 col-xl-7'>
            <ProjectsOverview />
          </div>
          <div className='col-sm-12 col-md-6 col-xl-5'>
            <div className='position-relative'>
              <WorkExperience />
            </div>
            <EducationOverview />
            <SkillOverview />
          </div>
        </div> */}
      </div>
      <Footer />
      <button
        ref={mybutton}
        type="button"
        className="btn btn-floating btn-lg fade-in-1"
        id="btn-back-to-top"
        onClick={backToTop}
        aria-label="Top"
        >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default Home;
