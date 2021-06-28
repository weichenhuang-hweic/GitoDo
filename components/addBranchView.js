import AddTitle from '../components/ShareComponent/addTitle';
import Permission from '../components/ShareComponent/permission';
import BranchColor from '../components/ShareComponent/branchColor';
import BranchChooseView from './AddTaskComponents/branchChooseView';
import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import {addBranch} from '../api/line';
import {addNode} from '../api/node';
import Router from 'next/router';

let qs = require('qs');
class AddBranchView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      branchName: '',
      branchColor: '#f44336',
      permission: null,
      colorRGB: {'r': 244, 'g': 67, 'b': 54},
      branchFromTitle: '',
      branchFromId: '',
    };

    this.handleBranchChoose = this.handleBranchChoose.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:pt-28 pt-10 mx-5 sm:mx-10 p-5 sm:mt-0 mt-24'>
            <h1 className='text-2xl'>Add a new branch</h1>
            <p className='text-gray-500'>A branch contains many tasks, can also include multiple branches.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Branch' value={this.state.branchName} titleChange={this.handleTitleChange}></AddTitle>
              <BranchChooseView view={'branch'} color={this.state.branchColor} branchTitle={this.state.branchFromTitle} branchId={this.state.branchFromId} ChooseBranch={this.handleBranchChoose}></BranchChooseView>
              <Permission view={'add'} color={this.state.branchColor} value={this.state.permission} permissionChange={this.handlePermissionChange}></Permission>
              <BranchColor onColorChange={this.handleColorChange} color={this.state.branchColor}></BranchColor>
            </div>
            <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3'>
              <span>Add Branch</span>
            </button>
            <Link href='/main'>
              <button className='ring-2 ring-red-600 text-red-800 bg-red-200 hover:bg-red-600 hover:text-white rounded-lg shadow-md py-2 px-2.5 focus:outline-none my-3 ml-5'>
                <a>
                  <span>Discard</span>
                </a>
              </button>
            </Link>
          </div>
        </form>
      </>
    );
  }

  handleBranchChoose(title, id) {
    this.setState({branchFromTitle: title, branchFromId: id});
  }

  handleColorChange(color) {
    this.setState({ branchColor: color.hex, colorRGB: color.rgb});
  }

  handleTitleChange(value) {
    this.setState({ branchName: value,});
  }

  handlePermissionChange(value) {
    this.setState({ permission: value});
  }
  
  handleSubmit(event) {
    if(this.state.branchName == '' || this.state.permission == null)
      alert('You should enter a title, choose a due time, and choose the branch to add.');
    else {
      const now = new Date();
      let node_data = qs.stringify({
        'mother_line_id': `${this.state.branchFromId}`,
        'create_date': `${now}`,
        'due_date': `${now}`,
        'title': `${this.state.branchName}`,
        'url': `${null}`,
        'content': `${null}`,
        'importance': '0',
      })
      addNode(node_data).then(node => {
        let branch_data = qs.stringify({
          'url': 'null',
          'content': 'null',
          'title': `${this.state.branchName}`,
          'owner': `${this.props.userId}`,
          'create_date': `${now}`,
          'due_date': `${now}`,
          'color_RGB': `[${this.state.colorRGB['r']},${this.state.colorRGB['g']},${this.state.colorRGB['b']}]`,
          'is_main': this.state.branchFromTitle == 'Set as Main Branch' ? true : false,
          'permission': this.state.permission,
          'nodeId': `${node._id}`
        }); 
        addBranch(branch_data).then(() => {
          Router.push({
            pathname: '/main/branch',
          }, `/main/branch`);
          // TODO: add status and show new line is added.
        }).catch(err => {
          console.error('Error while adding branch', err);
          window.location.reload();
        });
      }).catch(err => {
        console.error('Error while adding branch', err);
        window.location.reload();
      });
    }
    event.preventDefault();
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBranchView);