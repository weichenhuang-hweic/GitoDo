import AddTitle from '../components/ShareComponent/addTitle';
import Permission from '../components/ShareComponent/permission';
import BranchColor from '../components/ShareComponent/branchColor';
import React from 'react';
import Link from 'next/link';
import { withRouter } from "next/router"
import { deleteNode, getNode } from '../api/node';
import { modifyLine, getNodesByLine, deleteBranch } from '../api/line';
import Router from 'next/router';
import { connect } from 'react-redux'
import {endListAllLineClear, endListTaskClear} from '../redux/actions/branchActions';

let qs = require('qs');
class EditBranchView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      branchName: null,
      branchColor: '#f44336',
      permission: null,
      colorRGB: {'r': 244, 'g': 67, 'b': 54},
      branchFromTitle: '',
      branchFromId: '',
      sharer: [],
      sharer_progress: [],
      url: null,
      is_main: false,
      contain_branch: 0,
      branch_line_id: [],
    };

    this.handleBranchDelete = this.handleBranchDelete.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.RGBToHex = this.RGBToHex.bind(this);
  }

  componentDidMount() {
    const branch_color = this.RGBToHex(this.props.color_RGB[0], this.props.color_RGB[1], this.props.color_RGB[2]);
    this.setState({ 
      branchName: this.props.title,
      branchColor: branch_color,
      permission: this.props.permission,
      colorRGB: {'r': this.props.color_RGB[0], 'g': this.props.color_RGB[1], 'b': this.props.color_RGB[2]},
      sharer: this.props.sharer,
      sharer_progress: this.props.sharer_progress,
      url: this.props.url,
      is_main: this.props.is_main,
      contain_branch: this.props.contain_branch,
      branch_line_id: this.props.branch_line_id,
    });
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:pt-28 pt-10 mx-5 sm:mx-10 p-5 sm:mt-0 mt-24'>
            <div className='flex flex-row justify-between'>
              <div>
                <h1 className='text-2xl'>Edit branch</h1>
                <p className='text-gray-500'>A branch contains many tasks, can also include multiple branches.</p>
              </div>
              <div className='relative hover-trigger flex flex-row cursor-pointer' onClick={this.handleBranchDelete}>
                <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-10 right-7'>Delete (Delete&nbsp;branch&nbsp;will&nbsp;also&nbsp;delete&nbsp;all&nbsp;tasks)</span>
                <span className='pt-5 material-icons text-md transform scale-90 text-gray-400 hover:text-red-500'>delete</span>
              </div>
            </div>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Branch' value={this.state.branchName} titleChange={this.handleTitleChange}></AddTitle>
              <Permission color={this.state.branchColor} id={this.props._id} value={this.state.permission} permissionChange={this.handlePermissionChange}></Permission>
              <BranchColor onColorChange={this.handleColorChange} color={this.state.branchColor}></BranchColor>
            </div>
            <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3'>
              <span>Save Change</span>
            </button>
            <Link href='/main/branch'>
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

  RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

  handleBranchDelete() {
    this.props.listAllLineClear();
    this.props.listTaskClear();
    if(this.state.contain_branch == 0) {
      deleteBranch(this.props.node_id, this.props._id)
      getNode(this.props.node_id).then(node => {
        deleteNode(node.mother_line_id, this.props.node_id)
      })
      Router.push({
        pathname: '/main',
        query: {},
      }, `/main`);
    } else {
      getNodesByLine(this.props._id, 0, 1000, 0).then(task => {
        for(let i = 0; i < task.length; i++){
          if(task[i].branch_line_id){
            let node = task[i];
            deleteBranch(node._id, node.branch_line_id[0])
            getNode(this.props.node_id).then(node => {
              deleteNode(node.mother_line_id, this.props.node_id)
            })
          }
        }
        deleteBranch(this.props.node_id, this.props._id)
        getNode(this.props.node_id).then(node => {
          deleteNode(node.mother_line_id, this.props.node_id)
        })
      })
      Router.push({
        pathname: '/main',
        query: {},
      }, `/main`);
    }
  }

  handleColorChange(color) {
    this.setState({ branchColor: color.hex, colorRGB: color.rgb});
  }

  handleTitleChange(value) {
    this.setState({ branchName: value,});
  }

  handlePermissionChange(value) {
    this.setState({ permission: value,});
  }
  
  handleSubmit(event) {
    if(this.state.taskName == '' || this.state.permission == null)
      alert('You should enter a title, choose a due time to modify.');
    else {
      console.log(this.state.colorRGB)
      let data = qs.stringify({
        'title': `${this.state.branchName}`,
        'owner': `${this.props.owner}`,
        'permission': `${this.state.permission}`,
        'color_RGB': `[${this.state.colorRGB['r']},${this.state.colorRGB['g']},${this.state.colorRGB['b']}]`,
      })
      // console.log(data)
      modifyLine(this.props._id, data).then(() => {
        Router.push({
          pathname: '/main/branch',
        }, `/main/branch`);
        // TODO: add status and show new line is added.
      }).catch(err => {
        console.error('Error while edit node', err);
        window.location.reload();
      });
    }
    event.preventDefault();
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
});

const mapDispatchToProps = {
  listAllLineClear: endListAllLineClear,
  listTaskClear: endListTaskClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditBranchView));