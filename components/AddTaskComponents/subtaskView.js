import React from 'react';
import SubtaskForm from './subtaskForm';
import SubtaskList from './subtaskList';

export default class SubtaskView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      addingSubTitle: '',
    };

    this.handleSubExpand = this.handleSubExpand.bind(this);
    this.handleAddSubChange = this.handleAddSubChange.bind(this);
    this.handleAddSubtask = this.handleAddSubtask.bind(this);
    this.handleDelSubtask = this.handleDelSubtask.bind(this);
    this.handleDoneSubtask = this.handleDoneSubtask.bind(this);
  }

  render() {
    const stylebranch = {
      backgroundColor: this.props.color,
      '--tw-ring-color': this.props.color
    }
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center bg-white cursor-default group`}>
          <div className='flex flex-row items-center cursor-pointer' onClick={this.handleSubExpand}>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Subtask</span>
            <div className='flex-grow'/>
            <span className={'material-icons text-gray-400 hover:text-gray-700 transform origin-center transition-all sm:mr-12 cursor-pointer mr-7' + (this.state.open ? ' rotate-180' : ' rotate-0')} onClick={this.handleSubExpand}>expand_more</span>
          </div>
          {this.state.open && (<div>
            <div className='sm:mx-8 sm:my-5 my-2 mx-4'>
              <SubtaskForm color={this.props.color} value={this.state.addingSubTitle} AddSubChange={this.handleAddSubChange} AddSub={this.handleAddSubtask}></SubtaskForm>
            </div>
            <div className='sm:mx-8 sm:my-5 my-2 mx-4'>
              <SubtaskList color={this.props.color} subtask={this.props.subtask} value={this.state.addingSubTitle} AddSubChange={this.handleAddSubChange} AddSub={this.handleAddSubtask} DelSub={this.handleDelSubtask} DoneSub={this.handleDoneSubtask} delete={true}></SubtaskList>
            </div>
            </div>)
          }
        </div>
      </>
    )
  }

  handleSubExpand () {
    this.setState({ open: !this.state.open, });
  }

  handleAddSubChange(value) {
    this.setState({ addingSubTitle: value,});
  }

  handleAddSubtask(value) {
    this.props.AddSub(value);
  }

  handleDelSubtask(value) {
    this.props.DelSub(value);
  }

  handleDoneSubtask(value, done, id) {
    this.props.DoneSub(value, done, id);
  }
}