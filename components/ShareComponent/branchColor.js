import React from 'react';
import { CirclePicker } from 'react-color';

export default class BranchColor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  render(){
    const stylebar = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white`}>
          <div className='container items-center flex'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Color</span>
          </div>
          <div className='container flex items-center mt-8 mb-4 md:ml-10 p-0 ml-5 mr-5 ring-gray-500'>
            <CirclePicker color={this.props.color} width={''} circleSize={20} onChangeComplete={ this.handleChangeComplete }/>
          </div>
        </div>
      </>
    )
  }

  handleChangeComplete(color) {
    this.props.onColorChange(color);
  }
}