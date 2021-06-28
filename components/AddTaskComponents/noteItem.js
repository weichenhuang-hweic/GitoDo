import React from 'react';
export default class NoteItem extends React.Component {
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
        <div className='container shadow rounded-lg p-4 my-3 sm:flex-row flex-col flex items-center cursor-default bg-white'>
          <div className='container items-center flex'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Content</span>
            <div className='flex-grow' />
          </div>
          <div className='sm:ml-5 flex sm:flex-row flex-col p-5'>
            <textarea type='textarea' className='text-left rounded-md mx-1 md:w-96 w-64 bg-white border-gray-200 border-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
            placeholder='Type your note' onChange={this.handleChange} value={this.props.note}
            ></textarea>
          </div>
        </div>
      </>
    )
  }

  handleChange (event) {
    this.props.noteChange(event.target.value);
  }
}