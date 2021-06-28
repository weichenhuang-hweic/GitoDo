import React from 'react';

export default class CopyBranchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.RGBToHex = this.RGBToHex.bind(this);
  }

  render() {
    const {color_RGB, title} = this.props.Line;
    const branch_color = this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2]);
    const stylebranch = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-3 py-5 px-4 my-3 sm:flex-row flex-col flex items-center cursor-pointer bg-white' onClick={this.handleBranch}>
          <div className='container flex-row flex items-center'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden text-lg'>{title}</span>
          </div>
          <div className='sm:flex-grow'/>
          <div className='container flex-row flex items-center mr-0'>
          <div className='flex-grow'/>
          {
            this.props.Line.sharer ?
            (this.props.Line.sharer.length >= 1 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
              <span className='material-icons pt-2 text-gray-400 group-hover:text-gray-500'>supervised_user_circle</span>
              {/*<span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 z-10 hover-target'>{this.props.Line.sharer[1-1]}</span>*/}
            </div>) : ''
          }
          {
            this.props.Line.sharer ?
            (this.props.Line.sharer.length >= 2 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
              <span className='material-icons pt-2 text-gray-400 group-hover:text-gray-500'>supervised_user_circle</span>
              {/*<span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 z-10 hover-target'>{this.props.Line.sharer[2-1]}</span>*/}
            </div>) : ''
          }
          {
            this.props.Line.sharer ?
            (this.props.Line.sharer.length >= 3 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
              <span className='material-icons pt-2 text-gray-400 group-hover:text-gray-500'>supervised_user_circle</span>
              {/*<span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 z-10 hover-target'>{this.props.Line.sharer[3-1]}</span>*/}
            </div>) : ''
          }
          {
            this.props.Line.sharer ?
            (this.props.Line.sharer.length > 3 && 
            <div className='hover-trigger relative sm:mx-2 mx-1'>
              <span className='text-white text-xs bg-gray-400 rounded-full p-1'>+{this.props.Line.sharer.length-3}</span>
            </div>) : ''
          }
          <div className='hover-trigger relative sm:mx-2 mx-1 pt-2'>
            <span className='material-icons text-green-600'>attribution</span>
            <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 text-center z-10 hover-target'>Owner{' ' + this.props.owner}</span>
          </div>
          </div>
        </div>
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
}