import TaskItem from './ShareComponent/taskItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainTaskView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDraw = this.handleDraw.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTaskUndone = this.handleTaskUndone.bind(this);
  }

  render() {
    let allTask = [...this.props.task];
    if (!allTask) allTask = [];
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (allTask.length > 1) {
      allTask.shift();
      let task = allTask.filter(
        (element) => element.task.branch_line_id == null
      );
      children = task.map((p, index) => (
        <ListGroupItem key={p.task._id} action>
          <TaskItem
            {...p}
            userId={this.props.userId}
            index={index}
            onDraw={this.handleDraw}
            onTaskDone={this.handleTaskDone}
            onTaskUndone={this.handleTaskUndone}
          />
        </ListGroupItem>
      ));
    }

    return (
      <>
        <div className='pt-40 lg:ml-80 lg:mr-10 md:ml-20 ml-10 mr-1 p-5'>
          <ListGroup>{children}</ListGroup>
          {this.props.task.length <= 1 && this.props.loading == false && (
            <a href='/main/newtask'>
              <div className='container shadow rounded-lg flex-row py-5 my-3 px-5 flex items-center text-gray-700 bg-white cursor-pointer hover:bg-gray-50'>
                <div className={`inline ml-5 h-4 w-0.5`}></div>
                <span className='material-icons ring-2 ring-gray-700 rounded-full'>
                  add
                </span>
                <span
                  className='sm:ml-5 ml-3 font-semibold sm:w-36 w-auto overflow-hidden'
                  onClick={this.handleSubExpand}
                >
                  Go add a task!
                </span>
              </div>
            </a>
          )}
        </div>
      </>
    );
  }

  handleDraw(index, task_id, branch_color, mother_id, x, y) {
    let task = this.props.task.filter(
      (element) => element.branch_line_id == null
    );
    this.props.onDraw(
      index,
      task_id,
      branch_color,
      mother_id,
      x,
      y,
      task.length
    );
  }

  handleTaskDone(id, time, index) {
    this.props.onTaskDone(id, time, index);
  }

  handleTaskUndone(id, index) {
    this.props.onTaskUndone(id, index);
  }
}
