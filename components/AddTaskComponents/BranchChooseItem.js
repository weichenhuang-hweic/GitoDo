import React from 'react';
import {connect} from 'react-redux';

class BranchChooseItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { color: ''};

    this.RGBToHex = this.RGBToHex.bind(this);
    this.handleChooseBranch = this.handleChooseBranch.bind(this);
  }

  render() {
    const {color_RGB} = this.props.Line;
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
        <div className={`container ring-2 ${this.props.nowChoose != this.props.Line._id ? ' ring-gray-200 hover:ring-red-200 ' : ' ring-red-400 '} rounded-lg p-3 px-4 my-3 flex-row flex items-center bg-white cursor-pointer`} onClick={this.handleChooseBranch}>
          <button type='button' className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></button>
          <span className='ml-5 font-normal overflow-hidden'>{this.props.Line.title}</span>
          <div className='flex-grow'/>
          {
            this.props.mother._id != this.props.mainLine._id &&
            <div className='relative hover-trigger sm:mx-2 mx-1 pt-2'>
              <span className='material-icons text-red-400'>call_split</span>
              <span className={'backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 w-40 text-center z-10 hover-target'}>Branch&nbsp;From<br/>{branchFrom}</span>
            </div>
          }
          {
            this.props.Line.owner != 0 &&
            <div className='hover-trigger relative sm:mx-2 mx-1 pt-2'>
              <span className='material-icons text-green-600'>attribution</span>
              <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 text-center z-10 hover-target'>Owner {this.props.owner}</span>
            </div>
          }
        </div>
      </>
    )
  }

  handleChooseBranch() {
    const branch_color = this.RGBToHex(this.props.Line.color_RGB[0], this.props.Line.color_RGB[1], this.props.Line.color_RGB[2]);
    this.props.ChooseBranch(this.props.Line.title, this.props.Line._id, branch_color);
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
    let color = "#" + r + g + b;

    return color;
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BranchChooseItem);