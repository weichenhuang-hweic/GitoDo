import ImportBlock from './ShareComponent/importBlcok';
import AddTitle from './ShareComponent/addTitle';
import Permission from './ShareComponent/permission';
import BranchColor from './ShareComponent/branchColor';
import ShareBlock from './ShareComponent/shareBlcok';
import CopyBranchItem from './ShareComponent/copyBranchItem';
import React from 'react';
import Link from 'next/link';
import {getLine, copyLine, modifyLine} from '../api/line';
import {getUser} from '../api/user';
import {addNode, modifyNode} from '../api/node';
import {connect} from 'react-redux';
import Router from 'next/router';

let qs = require('qs');
class ImportBranchView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      urlmatch: false,
      branchId: null,
      branchItem: null,
      branchName: '',
      branchColor: '#f44336',
      colorRGB: {'r': 244, 'g': 67, 'b': 54},
      permission: null,
      branchState: 'copy',
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleBranchNameChange = this.handleBranchNameChange.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
  }

  render() {
    return(
      <>
        <form>
          <div className='pt-28 mx-5 sm:mx-10 p-5 sm:mt-0 mt-2'>
            <h1 className='text-2xl'>Import a branch</h1>
            <p className='text-gray-500'>Import an existing branch, adjust it to your special branch or collaborate with others.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <ImportBlock color={this.state.branchColor} value={this.state.url} handleUrl={this.handleUrl}></ImportBlock>
              {this.state.branchItem && <CopyBranchItem {...this.state.branchItem}></CopyBranchItem>}
              {(!this.state.branchItem) && 
                <div className='container shadow rounded-lg py-5 my-3 sm:flex-row flex-col flex items-center bg-white px-auto'>
                <span className='font-medium overflow-hidden text-lg mx-auto'>Please Import a right URL.</span>
                </div>
              }
              {this.state.branchState == 'copy' && <AddTitle color={this.state.branchColor} name='Branch' value={this.state.branchName} titleChange={this.handleBranchNameChange}></AddTitle>}
              {this.state.branchState == 'copy' && <Permission view={'add'} color={this.state.branchColor} value={this.state.permission} permissionChange={this.handlePermissionChange}></Permission>}
              <BranchColor onColorChange={this.handleColorChange} color={this.state.branchColor}></BranchColor>
              {this.state.branchState == 'false' && <ShareBlock color={this.state.branchColor}></ShareBlock>}
            </div>
            {this.state.branchState == 'copy' && <button onClick={this.handleSubmit} className='ring-2 ring-green-600 text-green-800 bg-green-200 hover:bg-green-600 hover:text-white rounded-lg shadow p-2 focus:outline-none my-3 mr-5'>
              <span>Copy</span>
            </button>}
            {this.state.branchState == 'collaborate' && <button type='submit' className='ring-2 ring-green-600 text-green-800 bg-green-200 hover:bg-green-600 hover:text-white rounded-lg shadow p-2 focus:outline-none my-3 mr-5'>
              <span>Collaborate</span>
            </button>}
            <Link href='/main'>
              <button className='ring-2 ring-red-600 text-red-800 bg-red-200 hover:bg-red-600 hover:text-white rounded-lg shadow py-2 px-2.5 focus:outline-none mt-3'>
                <a>
                  <span>Discard</span>
                </a>
              </button>
            </Link>
          </div>
        </form>
        <div className='sm:h-10 h-6'/>
      </>
    );
  }

  handleUrl(value) {
    this.setState({url: value,});
    value = value.toLowerCase();
    if(value.match('gitodo.com/import/')){
      this.setState({urlmatch: true})
      this.setState({branchId: value.replace('gitodo.com/import/', '')}, ()=>{
        if(this.state.branchId){
          if(this.state.branchId.length == 24){
            getLine(this.state.branchId).then(line => {
               console.log(line)
              if(line.color_RGB && line.permission){
                getUser(line.owner).then(owner => {
                  this.setState({branchItem: {Line: line, owner: owner.name}})
                })
              } else{
                this.setState({branchItem: null})
              }
            })
          } else{
            this.setState({branchItem: null})
          }
        } else{
          this.setState({branchItem: null})
        }
      })
    } else{
      this.setState({urlmatch: false})
      this.setState({branchId: null})
      this.setState({branchItem: null})
    }
  }

  handleColorChange(color) {
    this.setState({ branchColor: color.hex, colorRGB: color.rgb});
  }

  handleBranchNameChange(value) {
    this.setState({ branchName: value,});
  }

  handlePermissionChange(value) {
    this.setState({ permission: value,});
  }
  
  handleSubmit(event) {
    if(this.state.branchName == '' || this.state.permission == null || this.state.branchItem == null)
      alert('You should enter a title, choose a due time, and choose the branch to add.');
    else {
      copyLine(this.props.userId, this.state.branchItem.Line._id).then(line => {
        console.log(line);
        const now = new Date();
        let node_data = qs.stringify({
          'mother_line_id': `${this.props.mainLine._id}`,
          'create_date': `${now}`,
          'due_date': `${now}`,
          'title': `${this.state.branchName}`,
          'url': `${null}`,
          'content': `${null}`,
          'importance': '0',
        })
        addNode(node_data).then(node => {
          let data = qs.stringify({
            'branch_line_id': `["${line._id}"]`,
          })
          console.log('data', data)
          modifyNode(node._id, data).then(node => {
            console.log('mn',node)
          })
        });
        let data = qs.stringify({
          'title': `${this.state.branchName}`,
          'owner': `${this.props.userId}`,
          'permission': `${this.state.permission}`,
          'color_RGB': `[${this.state.colorRGB['r']},${this.state.colorRGB['g']},${this.state.colorRGB['b']}]`,
        })
        modifyLine(line._id, data).then(line => {
          console.log('ml',line)
          Router.push({
            pathname: '/main/branch',
          }, `/main/branch`);
          // TODO: add status and show new line is added.
          console.log('finish')
        }).catch(err => {
          console.error('Error while edit node', err);
          window.location.reload();
        });
      })
    }
    event.preventDefault();
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportBranchView);