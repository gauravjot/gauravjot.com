import React from 'react';

export default function Footer() {
  return (
    <center>
      <div className='p-4' />
      <div className='text-muted'>
        Developed with <a href='https://react.org' className='hover-underline'>React</a> by Gauravjot Garaya, {new Date().getFullYear()}
      </div>
      <br/>
    </center>
  );
}
