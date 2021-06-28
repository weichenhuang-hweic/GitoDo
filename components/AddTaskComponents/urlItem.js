import React from 'react';
export default class UrlItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white'>
          <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
          <span className='ml-5 font-semibold overflow-hidden'>URL</span>
          <div className='flex-grow' />
          <input type='text' className='text-center sm:mr-10 mx-3 sm:w-60 w-40 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
          placeholder='Type your URL' onChange={this.handleChange} value={this.props.url} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
          ></input>
        </div>
      </>
    )
  }

  handleChange (event) {
    this.props.urlChange(event.target.value);
  }
}