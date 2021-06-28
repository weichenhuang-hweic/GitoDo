import React from 'react';

export default class ImportBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white'>
          <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebar}></div>
          <span className='ml-5 font-semibold overflow-hidden'>Import URL</span>
          <div className='flex-grow' />
          <input className='text-center sm:mr-10 mx-3 w-20 sm:w-32 md:w-80 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
          placeholder='Paste the URL' value={this.props.value} onChange={this.handleChange}
          ></input>
        </div>
      </>
    )
  }

  handleChange (e) {
    this.props.handleUrl(e.target.value);
  }
}