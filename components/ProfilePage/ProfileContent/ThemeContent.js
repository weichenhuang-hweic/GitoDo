import React from 'react';

export default class AccountContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    
    let color = 'red';

    return (
      <>
      <h1 className="font-bold pb-1 text-xl">Theme</h1>
      <span className='font-semibold overflow-hidden text-black-300 text-sm pb-2'>Personalize your GitoDo...</span>
      <hr></hr>
      <h3 className="pt-3 text-red-400 text-xl">Coming Soon...</h3>
        
        
      
      
      </>
    )
  }
  }