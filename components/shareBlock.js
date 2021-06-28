import React from 'react';

export default class ShareBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    
    this.handleChange = this.handleChange.bind(this);
  }

  render(){
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white`}>
          <div className='container items-center flex'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Collaborate with Others</span>
          </div>
          <div className='ml-5 flex sm:flex-row flex-col p-5'>
            <span className=''>GitoDo Members or Email address</span>
            <div className='sm:flex-grow' />
            <input className='sm:my-0 my-10 text-center sm:mr-10 mx-3 sm:w-48 md:w-96 w-auto bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
            placeholder='Search for members to invite' value={this.props.value} onChange={this.handleChange}
            ></input>
            <button type='submit' className='bg-gray-300 hover:bg-gray-600 text-gray-600 hover:text-white rounded-lg focus:outline-none px-2 w-auto sm:py-0 py-2'>
                <span>Invite</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  handleChange (event) {
    this.props.branchNameChange(event.target.value);
  }
}