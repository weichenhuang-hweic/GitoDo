import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

export default class DateItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false,};

    this.handleDatePick = this.handleDatePick.bind(this);
    this.handleDateExpand = this.handleDateExpand.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    } 
    const now = new Date();
    const time = this.props.dueDate ? this.props.dueDate : now;
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center bg-white`}>
          <div className='flex flex-row items-center cursor-pointer' onClick={this.handleDateExpand}>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Due Time</span>
            <div className='flex-grow'/>
            <span className='mr-5 text-sm font-normal text-blue-500 overflow-hidden hover:text-blue-700 cursor-pointer' onClick={this.handleDateExpand}>{moment(time).format('YYYY-MM-DD HH:mm ddd')}</span>
            <span className={'material-icons text-gray-400 hover:text-gray-700 transform origin-center transition-all sm:mr-12 cursor-pointer mr-7' + (this.state.open ? ' rotate-180' : ' rotate-0')} onClick={this.handleDateExpand}>expand_more</span>
          </div>
          { this.state.open && 
              <Datetime className='m-1 mt-3 shadow-sm transition-all duration-500' input={false} initialViewMode='days' onChange={this.handleDatePick} initialValue={moment(time)}></Datetime>
          }
        </div>
      </>
  )}

  handleDatePick (moment) {
    this.props.datePick(moment);
  }

  handleDateExpand () {
    this.setState({ open: !this.state.open, });
  }
}