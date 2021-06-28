import React from 'react';
import ProfileHome from './ProfileHome';
import ThemeContent from './ProfileContent/ThemeContent';

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    
    return(
      <>
      <div className="grid grid-cols-7">
        <div className="col-start-2 col-span-1">
          <ProfileHome></ProfileHome>
        </div>
        <div className="col-start-3 col-end-6 col-span-4 sm:pt-36">
          <ThemeContent></ThemeContent>
        </div>
      </div>     
      </>
    );
  }
}