import React from 'react';
import Router from 'next/router';
import {getShareProgress, getLine} from '../../api/line';
import {getUser} from '../../api/user';

class BranchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {owner: '', shareder: null, shareder_name: [], shareder_avatar: [], re: false};

    this.handleDraw = this.handleDraw.bind(this);
    this.handleBranch = this.handleBranch.bind(this);
    this.RGBToHex = this.RGBToHex.bind(this);
  }

  componentDidMount() {
    if(!this.state.re) {
      const {color_RGB} = this.props.Line;
      const branch_color = color_RGB ? this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2]) : '#ffffff';
      let rect = this.node.getBoundingClientRect()
      this.setState({re: true}, () => {
        this.handleDraw(this.props.index, this.props.Line._id, branch_color, rect.x, rect.y)
      })
    }
    if(this.props.Line.is_share) {
      getShareProgress(this.props.Line.sharerLineId).then(progress => {
        getLine(progress.sharerLineId).then(line => {
          getUser(line.owner).then(user => {
            this.setState({owner: user.name})
          })
          const shareder_filter = progress.shareder.filter(element => element.shareder_user_id != this.props.userId);
          this.setState({shareder: shareder_filter})
          for(let i = 0; i < shareder_filter.length; i++) {
            getUser(shareder_filter[i].shareder_user_id).then(user => {
              this.setState({shareder_name: [...this.state.shareder_name, user.name]})
              this.setState({shareder_avatar: [...this.state.shareder_avatar, user.avatar_url]})
            })
          }
        })
      })
    } else {
      this.setState({owner: this.props.owner})
    }
  }

  render() {
    const {color_RGB, is_main, title} = this.props.Line;
    const branch_color = this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2]);
    const stylebranch = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color
    }
    let branchFrom = this.props.mother.title;
    if(branchFrom) {
      branchFrom = branchFrom.replace(/ /g, "\u00a0");
    }
    return (
      <>
        <div className='container shadow rounded-lg p-3 py-5 px-4 my-3 sm:flex-row flex-col flex items-center cursor-pointer bg-white' onClick={this.handleBranch}>
          <div className='container flex-row flex items-center' onClick={this.handleBranch}>
            <div ref={node => this.node = node} className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch} onClick={this.handleBranch}></div>
            <span className='ml-5 font-semibold overflow-hidden text-lg' onClick={this.handleBranch}>{title}</span>
          </div>
          <div className='sm:flex-grow' onClick={this.handleBranch}/>
          <div className='container flex-row flex items-center mr-0'>
          <div className='flex-grow'onClick={this.handleBranch}/>
          {
            this.state.shareder ?
            (this.state.shareder.length >= 1 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
              <img src={this.state.shareder_avatar[1-1]} className="ring-2 ring-gray-300 inline shadow-sm rounded-full h-6 w-6 overflow-hidden"></img>
              <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 z-10 hover-target'>{this.state.shareder_name[1-1]}</span>
            </div>) : ''
          }
          {
            this.state.shareder ?
            (this.state.shareder.length >= 2 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
            <img src={this.state.shareder_avatar[2-1]} className="ring-2 ring-gray-300 inline shadow-sm rounded-full h-6 w-6 overflow-hidden"></img>
              <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 z-10 hover-target'>{this.state.shareder_name[2-1]}</span>
            </div>) : ''
          }
          {
            this.state.shareder ?
            (this.state.shareder.length >= 3 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
            <img src={this.state.shareder_avatar[3-1]} className="ring-2 ring-gray-300 inline shadow-sm rounded-full h-6 w-6 overflow-hidden"></img>
              <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 z-10 hover-target'>{this.state.shareder_name[3-1]}</span>
            </div>) : ''
          }
          {
            this.state.shareder ?
            (this.state.shareder.length > 3 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
              <span className='text-white text-xs bg-gray-400 rounded-full p-1'>+{this.state.shareder.length-3}</span>
            </div>) : ''
          }
          {
            is_main == false &&
            <div className='relative hover-trigger sm:mx-2 mx-1 pt-2'>
              <span className='material-icons text-red-400'>call_split</span>
              <span className={'backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 w-auto text-center z-10 hover-target'}>Branch&nbsp;From<br/>{branchFrom}</span>
            </div>
          }
          <div className='hover-trigger relative sm:mx-2 mx-1 pt-2'>
            <span className='material-icons text-green-600'>attribution</span>
            <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 text-center z-10 hover-target'>Owner{' ' + this.state.owner}</span>
          </div>
          </div>
        </div>
      </>
    );
  }

  handleDraw(index, task_id, branch_color, mother_id, x, y) {
    this.props.onDraw(index, task_id, branch_color, mother_id, x, y);
  }

  handleBranch () {
    Router.push({
      pathname: '/[branchName]',
      query: { branchName: this.props.Line.title, id: this.props.Line._id, node_id: this.props.node_id },
    }, `/${this.props.Line.title}`);
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
}

export default (BranchItem);