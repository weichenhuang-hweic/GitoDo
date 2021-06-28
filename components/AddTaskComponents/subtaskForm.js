import React from 'react';

export default class SubtaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddSubtask = this.handleAddSubtask.bind(this);
  }

  render() {
    const stylebox = {
      backgroundColor: 'white',
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className='container ring-2 ring-gray-200 rounded-lg p-4 my-3 sm:flex-row flex-col flex items-center cursor-default bg-white'>
          <div className='container items-center flex'>
            <button type='submit' className={`sm:ml-5 outline-none focus:outline-none ring-2 rounded-sm w-4 h-4 cursor-default`} disabled={true} style={stylebox}></button>
            <span className='ml-5 font-normal overflow-hidden'>Add a new subtask</span>
            <div className='md:flex-grow' />
          </div>
          <div className='container ml-5 mx-2 flex flex-row p-0 py-2'>
            <input className='text-center sm:mr-5 md:w-60 w-36 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
            placeholder='Type your subtask content' value={this.props.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}
            ></input>
            <div className='sm:flex-shirnk flex-grow' />
            <span className={'material-icons text-gray-400 hover:text-gray-600 sm:mr-2 cursor-pointer mr-1 pt-2'} onClick={this.handleAddSubtask}>add</span>
          </div>
        </div>
      </>
    )
  }

  handleKeyPress(e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this.handleAddSubtask();
      e.preventDefault();
    }
  }

  handleChange (event) {
    this.props.AddSubChange(event.target.value);
  }

  handleAddSubtask() {
    this.props.AddSub(this.props.value);
    this.props.AddSubChange('');
  }
}