import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router'

export default class TaskDisplay extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }

    this.handleSubExpand = this.handleSubExpand.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleSubDone = this.handleSubDone.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);
  }

  render() {
    let branchName = 'Main';
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    } 
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
    const importance = [
      '', '!', '!!', '!!!'
    ]
    return(
      <>
        <div className='container shadow rounded-lg flex-col my-3 px-5 flex items-center cursor-default bg-white'>
          <div className='container flex-row flex items-center cursor-pointer bg-white my-3' onClick={this.handleSubExpand}>
            <button type='submit' className={`outline-none focus:outline-none ring-2 rounded-sm w-4 h-4`} style={this.props.achieved ? stylecomplete : stylebox} onClick={this.handleTaskDone}></button>
            <div className={`sm:inline hidden ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold sm:w-24 w-10 overflow-hidden'>{branchName}</span>
            <div className={`ml-5 h-4 w-0.5 bg-black ring-0.5 ring-black`}></div>
            <span className='ml-5 font-semibold sm:w-60 w-36 overflow-hidden'>{this.props.title}</span>
            <div className='md:flex-grow' />
            {this.props.due_date && <span className='mr-1 text-sm font-normal sm:w-56 text-gray-500 hover:text-blue-700 overflow-hidde self-baseline pt-1'>{this.props.due_date}</span>}
            {this.props.importance >= 0 &&  <span className='mx-5 text-md font-semibold text-blue-700 overflow-hidde self-baseline'>{importance[this.props.importance]}</span>}
            <button onClick={this.handleTaskEdit} className={`outline-none focus:outline-none pt-2`}>
              <span className='material-icons text-xs'>mode_edit</span>
            </button>
          </div>
          {
          this.state.open &&
          <div className='container flex-col flex items-center bg-white py-2'>
            {
              this.props.url && 
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
                <div className={`ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
                <span className='ml-5 font-medium overflow-hidden mr-2 w-32'>Current Password</span>
                <Link href={this.props.url}><span className='font-normal overflow-hidden cursor-pointer text-blue-700 hover:underline'>{this.props.url}</span></Link>
                <div className='flex-grow'/>
              </div>
            }
            {
              this.props.content &&
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
                <div className={`ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
                <span className='ml-5 font-medium overflow-hidden mr-2 w-32'>Content</span>
                <p className='font-normal overflow-scroll sm:w-auto w-96 sm:ml-7 bg-gray-100 p-2 rounded-lg px-5'>{this.props.content}</p>
                <div className='flex-grow'/>
              </div>
            }
            {
              this.props.subtask.length > 0 && 
              <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
                <div className={`ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
                <span className='ml-5 font-medium overflow-hidden mr-2 w-32'>Subtask</span>
                <div className='container pr-2'>
                </div>
              </div>
            }
          </div>
          }
          
        </div>
         
      </>
    );
  }

  handleSubExpand () {
    this.setState({ open: !this.state.open, });
  }

  handleTaskDone() {
    this.props.onTaskDone(moment().format("YYYY-MM-DD HH:mm ddd"));
  }

  handleSubDone(id) {
    this.props.onSubtaskDone(id, this.props.id);
  }

  handleTaskEdit () {
    console.log('Edit: ' + this.props.id);
    // Dynamic Routing
    Router.push({
      pathname: '/[branchName]/[taskId]/edit',
      query: { branchName: this.props.mother_line_id, taskId: this.props.id, title:this.props.title },
    }, `/${this.props.mother_line_id}/${this.props.title}/edit`);
  }
}