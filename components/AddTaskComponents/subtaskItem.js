import React from 'react';

export default class SubtaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDelSubtask = this.handleDelSubtask.bind(this);
    this.handleDoneSub = this.handleDoneSub.bind(this);
  }

  render() {
    const stylebox = {
      backgroundColor: 'white',
      '--tw-ring-color': this.props.color
    }
    const stylecomplete = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color,
      border: '2px solid #fff',
      'boxShadow': '0 0 0 2px this.props.color',
    }
    return (
      <>
        <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-3 flex-row flex items-center cursor-default bg-white'>
          <button type='button' className={`sm:ml-5 outline-none focus:outline-none ring-2 rounded-sm w-4 h-4`} style={this.props.done == 'true' ? stylecomplete : stylebox} onClick={this.handleDoneSub}></button>
          <span className='ml-5 font-normal overflow-hidden'>{this.props.subtask}</span>
          <div className='flex-grow'/>
          {this.props.delete && <span className={'material-icons text-gray-400 hover:text-gray-600 sm:mr-4 cursor-pointer mr-0 transform rotate-45'} onClick={this.handleDelSubtask}>add</span>}
        </div>
      </>
    )
  }

  handleDelSubtask() {
    this.props.DelSub(this.props.id);
  }

  handleDoneSub() {
    this.props.DoneSub(this.props.subtask, this.props.done == 'true' ? 'false' : 'true', this.props.id);
  }
}