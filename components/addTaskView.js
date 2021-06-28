import AddTitle from '../components/ShareComponent/addTitle';
import DateItem from '../components/AddTaskComponents/dateItem';
import ImportanceItem from '../components/AddTaskComponents/importanceItem';
import NoteItem from '../components/AddTaskComponents/noteItem';
import UrlItem from '../components/AddTaskComponents/urlItem';
import SubtaskView from '../components/AddTaskComponents/subtaskView';
import BranchChooseView from '../components/AddTaskComponents/branchChooseView';
import React from 'react';
import Link from 'next/link';
import {addNode, addSubtask} from '../api/node';
import Router from 'next/router';

let qs = require('qs');
export default class AddTaskView extends React.Component{
  constructor(props) {
    super(props);

    let now = new Date();
    this.state = {
      branchTitle: '',
      branchId: '',
      taskName: '',
      branchColor: '#f44336',
      dueDate: now,
      dueDateJSON: now.toJSON(),
      importance: 0,
      note: null,
      url: null,
      subtask: [],
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBranchChoose = this.handleBranchChoose.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.handleImportPick = this.handleImportPick.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubAdd = this.handleSubAdd.bind(this);
    this.handleSubDel = this.handleSubDel.bind(this);
    this.handleSubDone = this.handleSubDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <>
        <form>
          <div className='sm:pt-28 pt-10 mx-4 sm:mx-10 p-5 sm:mt-0 mt-24 pl-5'>
            <h1 className='text-2xl'>Add a new task</h1>
            <p className='text-gray-500'>A task contains notes, due dates, and sub-tasks ... etc.</p>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Task' value={this.state.taskName} titleChange={this.handleTitleChange}></AddTitle>
              <BranchChooseView view={'task'} color={this.state.branchColor} branchTitle={this.state.branchTitle} branchId={this.state.branchId} ChooseBranch={this.handleBranchChoose}></BranchChooseView>
              <DateItem color={this.state.branchColor} dueDate={this.state.dueDateJSON} datePick={this.handleDatePick}></DateItem>
              <ImportanceItem color={this.state.branchColor} importance={this.state.importance} importPick={this.handleImportPick}></ImportanceItem>
              <NoteItem color={this.state.branchColor} note={this.state.note} noteChange={this.handleNoteChange}></NoteItem>
              <UrlItem color={this.state.branchColor} url={this.state.url} urlChange={this.handleUrlChange}></UrlItem>
              <SubtaskView color={this.state.branchColor} AddSub={this.handleSubAdd} subtask={this.state.subtask} DelSub={this.handleSubDel} DoneSub={this.handleSubDone}></SubtaskView>
            </div> 
            <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3' onClick={this.handleSubmit}>
              <span>Add Task</span>
            </button>
            <Link href='/'>
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

  handleTitleChange(value) {
    this.setState({ taskName: value,});
  }

  handleBranchChoose(title, id, color) {
    this.setState({branchTitle: title, branchId: id, branchColor: color});
  }

  handleDatePick(moment) {
    let time = moment.format("YYYY-MM-DD HH:mm ddd");
    this.setState({ dueDate: time, dueDateJSON: moment.toJSON()});
  }

  handleImportPick(index) {
    this.setState({ importance: index,});
  }

  handleNoteChange(value) {
    this.setState({ note: value,});
  }

  handleUrlChange(value) {
    this.setState({ url: value,});
  }

  handleSubAdd(value) {
    if(value != '') {
      let newSub = {'subtask': value, 'done': 'false'};
      this.setState({ subtask: [...this.state.subtask, newSub]});
    }
  }

  handleSubDel(id) {
    let ReSubtask = this.state.subtask;
    ReSubtask.splice(id, 1);
    this.setState({ subtask: ReSubtask});
  }

  handleSubDone(value, done, id) {
    let ReSubtask = this.state.subtask;
    console.log(ReSubtask)
    ReSubtask[id].done = done;
    this.setState({ subtask: ReSubtask});
  }
  
  handleSubmit(event) {
    console.log(this.state.taskName, this.state.dueDateJSON, this.state.branchId)
    if(this.state.taskName == '' || !this.state.dueDateJSON || this.state.branchId == '')
      alert('You should enter a title, choose a due time, and choose the branch to add. If you do not have a branch, please add a branch first.');
    else {
      const now = new Date();
      let data = qs.stringify({
        'mother_line_id': this.state.branchId,
        'create_date': `${now}`,
        'due_date': this.state.dueDateJSON,
        'title': `${this.state.taskName}`,
        'url': `${this.state.url ? `"${this.state.url}"` : null}`,
        'content': `${this.state.note ? `"${this.state.note}"` : null}`,
        'importance': this.state.importance,
        'is_main': true
      })
      addNode(data).then(node => {
        for(let i = 0; i < this.state.subtask.length; i++){
          let data = qs.stringify({
            'subtask': `${this.state.subtask[i].subtask}`,
            'done': `${this.state.subtask[i].done}`,
            'nodeId': `${node._id}`, 
          });
          addSubtask(data);
        }
        Router.push({
          pathname: '/main',
        }, `/main`);
        // TODO: add status and show new line is added.
      }).catch(err => {
        console.error('Error while adding branch', err);
        window.location.reload();
      });
    }
    event.preventDefault();
  }
}