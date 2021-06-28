import AddTitle from '../components/ShareComponent/addTitle';
import DateItem from '../components/AddTaskComponents/dateItem';
import ImportanceItem from '../components/AddTaskComponents/importanceItem';
import NoteItem from '../components/AddTaskComponents/noteItem';
import UrlItem from '../components/AddTaskComponents/urlItem';
import SubtaskView from '../components/AddTaskComponents/subtaskView';
import React from 'react';
import Link from 'next/link';
import { withRouter } from "next/router"
import { modifyNode, addSubtask, getNode, deleteSubTask, modifySubTask, deleteNode} from '../api/node';
import Router from 'next/router';
import { connect } from 'react-redux'
import {endListAllLineClear, endListTaskClear} from '../redux/actions/branchActions';

let qs = require('qs');
class EditTaskView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      branchColor: '',
      isDate: false,
      dueDate: null,
      dueDateJSON: null,
      importance: 0,
      note: '',
      url: '',
      subtask: [],
      achieved: false,
      achieved_at: null,
    };

    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateToggle = this.handleDateToggle.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.handleImportPick = this.handleImportPick.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubAdd = this.handleSubAdd.bind(this);
    this.handleSubDel = this.handleSubDel.bind(this);
    this.handleSubDone = this.handleSubDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.RGBToHex = this.RGBToHex.bind(this);
  }

  componentDidMount() {
    const branch_color = this.RGBToHex(this.props.line.color_RGB[0], this.props.line.color_RGB[1], this.props.line.color_RGB[2]);
    this.setState({ 
      taskName: this.props.title,
      branchColor: branch_color,
      isDate: (this.props.due_date ? true : false),
      dueDate: this.props.due_date,
      dueDateJSON: this.props.due_date,
      importance: this.props.importance,
      note: this.props.content,
      url: this.props.url,
      subtask: this.props.subtask,
      achieved: this.props.achieved,
      achieved_at: this.props.achieved_at,
    });
  }

  render() {
    return(
      <>
        <form>
          <div className='sm:pt-28 pt-10 mx-5 sm:mx-10 p-5 sm:mt-0 mt-24'>
            <div className='flex flex-row justify-between'>
              <div>
                <h1 className='text-2xl'>Edit task</h1>
                <p className='text-gray-500'>A task contains notes, due dates, and sub-tasks ... etc.</p>
              </div>
              <div className='relative hover-trigger flex flex-row cursor-pointer' onClick={this.handleTaskDelete}>
                <span className='hover-target rounded-md p-1 bg-opacity-90 bg-gray-800 text-white text-sm absolute top-10 right-7'>Delete</span>
                <span className='pt-5 material-icons text-md transform scale-90 text-gray-400 hover:text-red-500'>delete</span>
              </div>
            </div>
            <hr className='my-2'></hr>
            <div className='container flex-col'>
              <AddTitle color={this.state.branchColor} name='Task' value={this.state.taskName} titleChange={this.handleTitleChange} achieved={this.state.achieved} onDone={this.handleTaskDone}></AddTitle>
              <DateItem color={this.state.branchColor} isDate={this.state.isDate} dueDate={this.state.dueDateJSON} dateToggle={this.handleDateToggle} datePick={this.handleDatePick}></DateItem>
              <ImportanceItem color={this.state.branchColor} importance={this.state.importance} importPick={this.handleImportPick}></ImportanceItem>
              <NoteItem color={this.state.branchColor} note={this.state.note} noteChange={this.handleNoteChange}></NoteItem>
              <UrlItem color={this.state.branchColor} url={this.state.url} urlChange={this.handleUrlChange}></UrlItem>
              <SubtaskView color={this.state.branchColor} AddSub={this.handleSubAdd} subtask={this.state.subtask} DelSub={this.handleSubDel} DoneSub={this.handleSubDone}></SubtaskView>
            </div> 
            <button type='submit' className='ring-2 ring-green-600 bg-green-200 hover:bg-green-600 text-green-800 hover:text-white rounded-lg shadow-md p-2 focus:outline-none my-3' onClick={this.handleSubmit}>
              <span>Save Change</span>
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

  handleTaskDelete() {
    deleteNode(this.props.line._id, this.props._id).then(() => {
      this.props.listAllLineClear();
      this.props.listTaskClear();
      Router.push({
        pathname: '/main',
      }, `/main`);
      // TODO: add status and show new line is deleted.
    })
  }

  handleTaskDone() {
    let now = new Date();
    this.setState({ 
      achieved: this.state.achieved == true ? false : true, 
      achieved_at: this.state.achieved == true ? null : now,
    })
  }

  handleDateToggle(checked) {
    if(!checked) {
      this.setState({ dueDate: null });
    }
    this.setState({ isDate: checked, });
  }

  handleTitleChange(value) {
    this.setState({ taskName: value,});
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
      let data = qs.stringify({
        'subtask': `${value}`,
        'done': false,
        'nodeId': `${this.props._id}`, 
      });
      addSubtask(data).then(() => {
        getNode(this.props._id).then(node => {
          this.setState({subtask: [...node.subtask],})
        })
      });
    }
  }

  handleSubDel(id) {
    deleteSubTask(this.props._id, id).then(() => {
      getNode(this.props._id).then(node => {
        this.setState({subtask: [...node.subtask],})
        console.log(node.subtask)
      })
    });
  }

  handleSubDone(value, done, id) {
    let data = qs.stringify({
      'subtask': `${value}`,
      'done': `${done}`,
      'subtaskIdx': `${id}`,
    });
    modifySubTask(this.props._id, data).then(() => {
      getNode(this.props._id).then(node => {
        this.setState({subtask: [...node.subtask],})
      })
    });
  }
  
  handleSubmit(event) {
    if(this.state.taskName == '' || !this.state.dueDateJSON)
      alert('You should enter a title, choose a due time to modify.');
    else {
      let data = qs.stringify({
        'due_date': this.state.dueDateJSON,
        'title': `${this.state.taskName}`,
        'url': `${this.state.url ? `"${this.state.url}"` : null}`,
        'content': `${this.state.note ? `"${this.state.note}"` : null}`,
        'importance': this.state.importance,
        'achieved': this.state.achieved,
        'achieved_at': `${this.state.achieved_at ? this.state.achieved_at : 'null'}`,
      })
      console.log(data)
      modifyNode(this.props._id, data).then(() => {
        Router.push({
          pathname: '/main',
        }, `/main`);
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
  mainLine: state.branch.mainLine,
  branchLoading: state.branch.branchLoading,
  allLine: state.branch.allLine,
});

const mapDispatchToProps = {
  listAllLineClear: endListAllLineClear,
  listTaskClear: endListTaskClear
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditTaskView));