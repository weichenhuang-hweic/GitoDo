import React from 'react';
import { SegmentedControl } from 'segmented-control-react';

export default class BranchChooseItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false,};

    this.handleImportPick = this.handleImportPick.bind(this);
    this.handleImportExpand = this.handleImportExpand.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    } 
    const segments = [
      { name: 'None' },
      { name: 'Low' },
      { name: 'Medium'},
      { name: 'High' }
    ]
    const importance = [
      'None', '!', '!!', '!!!'
    ]
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center bg-white cursor-default group`} onClick={this.handleImportExpand}>
          <div className='flex flex-row items-center cursor-pointer' onClick={this.handleImportExpand}>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch} onClick={this.handleImportExpand}></div>
            <span className='ml-5 font-semibold overflow-hidden' onClick={this.handleImportExpand}>Importance</span>
            <div className='flex-grow' onClick={this.handleImportExpand}> </div>
            <span className='font-normal pb-0.5 mr-5 text-gray-500 overflow-hidden' onClick={this.handleImportExpand}>{importance[this.props.importance]}</span>
            <span className={'material-icons text-gray-400 hover:text-gray-700 transform origin-center transition-all sm:mr-12 cursor-pointer mr-7' + (this.state.open ? ' rotate-180' : ' rotate-0')} onClick={this.handleImportExpand}>expand_more</span>
          </div>
          {this.state.open &&
            <div className='sm:px-16 sm:py-5 py-2 px-4'>
              <SegmentedControl segments={segments} selected={this.props.importance}
              variant='dark'
              onChangeSegment={this.handleImportPick }></SegmentedControl>
            </div>
          }
        </div>
      </>
  )}

  handleImportPick (index) {
    this.props.importPick(index);
  }

  handleImportExpand () {
    this.setState({ open: !this.state.open, });
  }
}