import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Permission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.handleChange = this.handleChange.bind(this);   
  }

  render() {
    let Link = 'gitodo.com/import/' + this.props.id;
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white'>
          <div className='container flex items-center sm:ml-5'>
            <div className={`h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='block ml-5 font-semibold overflow-hidden'>Permission</span>
          </div>
          <div className='container flex items-center ml-5 mt-5'>
            <input type='radio' name='branchPermission' value={false} className='mr-5 h-5 w-5' onChange={this.handleChange} checked={this.props.value == false}></input>
            <span className='material-icons'>lock</span>
            <div className='ml-5 container'>
              <span className='block font-semibold overflow-hidden'>Private</span>
              <p className='block w-auto mr-10 text-gray-500 overflow-hidden'>You choose who can see and commit to this branch.</p>
            </div>
          </div>
          <div className='container flex items-center ml-5 mt-5'>
            <input type='radio' name='branchPermission' value={true} className='mr-5 h-5 w-5' onChange={this.handleChange} checked={this.props.value == true}></input>
            <span className='material-icons'>public</span>
            <div className='ml-5  container'>
              <span className='block font-semibold overflow-hidden'>Public</span>
              <p className='block w-auto mr-10 text-gray-500 overflow-hidden'>Anyone on the internet can see and copy this branch. You can choose who can collaborate with.</p>
              {this.props.view != 'add' && this.props.value == true && <div className='container flex items-center mt-2 mb-2 mr-10 w-auto'>
                <span className='bg-green-100 text-green-800 p-2 rounded-md w-9 sm:w-auto overflow-scroll text-sm'>{Link}</span>
                <CopyToClipboard text={Link} onCopy={() => this.setState({copied: true})}>
                  <button onClick={() => {event.preventDefault();}} className='sm:ml-5 ml-2 bg-blue-100 text-blue-800 text-sm rounded-md p-2 focus:outline-none hover:bg-blue-600 hover:text-white'>
                  {this.state.copied ? 'Copied' : 'Copy link'}
                  </button>
                </CopyToClipboard>
              </div>}
              {this.state.copied && this.props.value == true && <p className='block w-auto mr-10 text-gray-500 overflow-hidden'>* You can let others copy this branch once its permission is public.</p>}
            </div>
          </div>
        </div>
      </>
  )}


  handleChange (event) {
    this.props.permissionChange(event.target.value == 'true' ? true : false);
  }
}