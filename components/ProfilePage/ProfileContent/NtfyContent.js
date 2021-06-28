import React from 'react';
import Link from 'next/link';
import Switch from 'react-switch';

export default class AccountContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {checkedCpy: false, checkedJoin: false, checkedUpd: false};
    this.handleCpy = this.handleCpy.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleUpd = this.handleUpd.bind(this);
  }
  handleCpy(checkedCpy){
    this.setState({checkedCpy});
  }
  handleJoin(checkedJoin){
    this.setState({checkedJoin});
  }
  handleUpd(checkedUpd){
    this.setState({checkedUpd});
  }
  render() {
    
    let color = 'green';

    return (
      <>
      <h1 className="font-bold pl-3 pr-3 pb-3 text-xl">Notification</h1>
      <hr></hr>
      <h3 className="font-medium pl-3 pr-3 pt-3 text-base">Notify me when...</h3>
        <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white max-w-xl w-auto'>
          <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
          <span className='ml-5 font-semibold overflow-hidden'>Someone copied my branch</span>
          <div className='flex-grow' />
          <Switch checkedIcon={false} uncheckedIcon={false} width={36} height={20} onChange={this.handleCpy} checked={this.state.checkedCpy} />

        </div>

        <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white max-w-xl w-auto'>
          <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
          <span className='ml-5 font-semibold overflow-hidden'>Collaborator joined my branch</span>
          <div className='flex-grow' />
          <Switch checkedIcon={false} uncheckedIcon={false} width={36} height={20} onChange={this.handleJoin} checked={this.state.checkedJoin} />
        </div>

        <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white max-w-xl w-auto'>
          <div className={`ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
          <span className='ml-5 font-semibold overflow-hidden'>Collaborator updated the task of sharing branch</span>
          <div className='flex-grow' />
          <Switch checkedIcon={false} uncheckedIcon={false} width={36} height={20} onChange={this.handleUpd} checked={this.state.checkedUpd} />
        </div>

        <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3' onClick={this.handleSubmit}>
          <span>Save</span>
        </button>
          <button className='ring-2 ring-red-600 text-red-800 bg-red-200 hover:bg-red-600 hover:text-white rounded-lg shadow-md py-2 px-2.5 focus:outline-none my-3 ml-5'
          onClick={() => this.setState({ checkedCpy: false, checkedJoin: false, checkedUpd: false,})}>
            <a>
              <span>Cancel</span>
            </a>
          </button>
      </>
    )
  }
  

  }