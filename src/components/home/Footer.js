import React from 'react';

export default function Footer() {
  return (
    <center>
      <div className='p-4' />
      <div className='text-muted'>
        Developed with <a href='https://reactjs.org' className='hover-underline'>React</a>
        &nbsp;by Gauravjot Garaya, {new Date().getFullYear()}.
        Open-source <a href='https://github.com/gauravjot/gauravjot.com' className='hover-underline'>GitHub</a>.
      </div>
      <br/>
    </center>
  );
}
