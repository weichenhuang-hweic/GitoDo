import React from 'react';
import SubtaskList from '../AddTaskComponents/subtaskList';
import Router from 'next/router';
import { getNode, modifySubTask } from '../../api/node';
import {
  getNodesByLine,
  getShareProgress,
  setShareProgress,
} from '../../api/line';
import { getUser } from '../../api/user';
let qs = require('qs');
import moment from 'moment';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      subtask: [],
      index: -1,
      progress_users: [],
      re: false,
      achieved: false,
      screen_wide: false,
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleSubExpand = this.handleSubExpand.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleSubDone = this.handleSubDone.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);
    this.RGBToHex = this.RGBToHex.bind(this);
  }


  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
    if (!this.state.re) {
      const { color_RGB } = this.props.line;
      const branch_color = color_RGB
        ? this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2])
        : '#ffffff';
      let rect = this.node.getBoundingClientRect();
      this.rect = rect;
      this.setState({ re: true }, () => {
        this.handleDraw(
          this.props.index,
          this.props.task._id,
          branch_color,
          this.props.line._id,
          rect.x,
          rect.y
        );
      });
    }
    this.setState({
      subtask: this.props.task.subtask,
      achieved: this.props.task.achieved,
    });
    getNodesByLine(this.props.line._id, 0, 1000, 0).then((task) => {
      const index = task
        .map((p) => {
          return p._id;
        })
        .indexOf(this.props.task._id);
      this.setState({ index: index });
      if (this.props.line.is_share == true && this.props.line.sharerLineId) {
        console.log(this.props.line.sharerLineId);
        getShareProgress(this.props.line.sharerLineId).then((progress) => {
          console.log(progress);
          const usersObj = progress.shareder
            .filter(
              (element) =>
                element.shareder_progress == index &&
                element.shareder_user_id != this.props.userId
            )
            .map((p) => {
              return p.shareder_user_id;
            });
          let user_new = [];
          for (let i = 0; i < usersObj.length; i++) {
            getUser(usersObj[i]).then((user) => {
              user_new = [...user_new, user.name];
              if (i == usersObj.length - 1) {
                this.setState({ progress_users: user_new });
              }
            });
          }
        });
      }
    });
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize())
  }

  render() {
    let branchName = 'Main';
    const { color_RGB, title } = this.props.line;
    branchName = title;
    const branch_color = color_RGB
      ? this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2])
      : '#ffffff';
    const stylebranch = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color,
    };
    const stylebox = {
      backgroundColor: 'white',
      '--tw-ring-color': branch_color,
    };
    const stylecomplete = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color,
      border: '2px solid #fff',
      boxShadow: '0 0 0 2px branch_color',
    };
    const importance = ['', '!', '!!', '!!!'];
    const userList = this.state.progress_users.map((user) => {
      return <li key={user}>{user}</li>;
    });
    let time = new Date(this.props.task.due_date);
    let now = new Date();
    let expire = false;
    if (Date.parse(this.props.task.due_date) < Date.parse(now)) {
      expire = true;
    }
    return (
      <div>
        <div className='container shadow rounded-lg flex-col my-3 px-5 flex items-center cursor-default bg-white'>
          <svg
            ref={(svg) => {
              this.svg = svg;
            }}
            className='absolute left-0'
            xmlns='http://www.w3.org/2000/svg'
            onClick={this.handleResize}
          >
            <circle
              className='cursor-pointer'
              onClick={this.handleTaskDone}
              cx={
                this.rect !== undefined
                  ? (this.state.screen_wide ? this.props.depth * 40 + 40 + 30 : 30)
                  : '0'
              }
              cy={this.rect !== undefined ? 35 : '0'}
              r='8'
              stroke={
                this.props.line.color_RGB !== undefined
                  ? this.RGBToHex(
                      this.props.line.color_RGB[0],
                      this.props.line.color_RGB[1],
                      this.props.line.color_RGB[2]
                    )
                  : ''
              }
              fill={
                '#ffffff'
              }
              strokeWidth='2.5'
            />
            <circle
              className='cursor-pointer'
              onClick={this.handleTaskDone}
              cx={
                this.rect !== undefined
                  ? (this.state.screen_wide ? this.props.depth * 40 + 40 + 30 : 30)
                  : '0'
              }
              cy={this.rect !== undefined ? 35 : '0'}
              r='5'
              stroke={
                this.props.line.color_RGB !== undefined
                  ? this.RGBToHex(
                      this.props.line.color_RGB[0],
                      this.props.line.color_RGB[1],
                      this.props.line.color_RGB[2]
                    )
                  : ''
              }
              fill={
                this.state.achieved
                  ? this.RGBToHex(
                      this.props.line.color_RGB[0],
                      this.props.line.color_RGB[1],
                      this.props.line.color_RGB[2]
                    )
                  : '#ffffffff'
              }
              strokeWidth='0'
            />
          </svg>
          <div
            className={`container md:flex-row flex-col flex items-center ${
              this.props.task.url ||
              this.props.task.content ||
              this.state.subtask
                ? 'cursor-pointer'
                : 'cursor-default'
            } bg-white my-3`}
            onClick={this.handleSubExpand}
          >
            <div className='container flex flex-row items-center'>
              <button
                ref={(node) => (this.node = node)}
                type='submit'
                className={`outline-none focus:outline-none ring-2 rounded-sm w-4 h-4`}
                style={this.state.achieved == true ? stylecomplete : stylebox}
                onClick={this.handleTaskDone}
              ></button>
              <div
                className={`inline ml-5 h-4 w-0.5 ring-2`}
                style={stylebranch}
              ></div>
              <span
                className='sm:ml-5 ml-3 font-semibold md:w-36 sm:w-24 w-auto overflow-hidden'
                onClick={this.handleSubExpand}
              >
                {branchName}
              </span>
              <div
                className={`sm:ml-5 ml-3 h-4 w-0.5 bg-black ring-0.5 ring-black`}
              ></div>
              <span
                className='sm:ml-5 ml-3 font-semibold md:w-40 sm:w-24 w-auto overflow-hidden'
                onClick={this.handleSubExpand}
              >
                {this.props.task.title}
              </span>
              <div className='md:flex-grow' onClick={this.handleSubExpand} />
            </div>
            <div className='md:flex-grow' onClick={this.handleSubExpand} />
            <div className='container flex flex-row items-center lg:justify-end justify-around'>
              {this.props.task.due_date && (
                <span
                  className={`items-center sm:mx-2 mx-1 text-sm text-center font-normal md:w-24 w-36  overflow-hidde self-baseline pt-1 ${
                    expire
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-blue-700'
                  }`}
                  onClick={this.handleSubExpand}
                >
                  {moment(time).format('MM-DD ddd hh:mm')}
                </span>
              )}
              {
                <span
                  className='pt-1 sm:mr-3 mr-1 text-md font-semibold text-blue-700 overflow-hidde self-baseline w-4'
                  onClick={this.handleSubExpand}
                >
                  {importance[this.props.task.importance]}
                </span>
              }
              {this.state.progress_users && (
                <div className='hover-trigger relative mr-3 w-5'>
                  {this.state.progress_users.length > 0 && (
                    <span
                      className={
                        'material-icons pt-2 text-gray-400 group-hover:text-gray-500'
                      }
                    >
                      supervised_user_circle
                    </span>
                  )}
                  {this.state.progress_users.length > 0 && (
                    <ul className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 hover-target'>
                      {userList}
                    </ul>
                  )}
                </div>
              )}
              <button
                onClick={this.handleTaskEdit}
                className={`outline-none focus:outline-none pt-2`}
              >
                <span className='material-icons text-xs transform scale-75 text-gray-400 hover:text-gray-600'>
                  mode_edit
                </span>
              </button>
            </div>
          </div>
          {this.state.open &&
            (this.props.task.url ||
              this.props.task.content ||
              this.state.subtask) && (
              <div className='container flex-col flex items-center bg-white py-2'>
                {this.props.task.url && (
                  <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-row flex items-center cursor-default bg-white'>
                    <div className='container flex flex-row items-center justify-start ml-0'>
                      <div
                        className={`ml-5 h-4 w-0.5 ring-2`}
                        style={stylebranch}
                      ></div>
                      <span className='ml-5 font-medium overflow-hidden mr-2'>
                        URL
                      </span>
                    </div>
                    <div className='container flex flex-row'>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        href={'//' + this.props.task.url}
                        className='mx-auto'
                      >
                        <span className='font-normal overflow-scroll w-auto cursor-pointer text-blue-700 hover:underline text-center'>
                          {this.props.task.url}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {this.props.task.content && (
                  <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 sm:flex-row flex-col flex items-center cursor-default bg-white'>
                    <div className='container flex flex-row items-center justify-start ml-0'>
                      <div
                        className={`ml-5 h-4 w-0.5 ring-2`}
                        style={stylebranch}
                      ></div>
                      <span className='ml-5 font-medium overflow-hidden w-32'>
                        Content
                      </span>
                    </div>
                    <div className='container flex flex-row items-center mx-auto justify-around'>
                      <p className='font-normal overflow-scroll w-96 sm:my-0 my-2 bg-gray-100 p-2 rounded-lg px-5'>
                        {this.props.task.content}
                      </p>
                    </div>
                  </div>
                )}
                {this.state.subtask && (
                  <div className='container ring-2 ring-gray-200 rounded-lg p-3 px-4 my-2 flex-col sm:flex-row flex items-center cursor-default bg-white'>
                    <div className='container flex-row flex justify-start items-center ml-0'>
                      <div
                        className={`ml-5 h-4 w-0.5 ring-2`}
                        style={stylebranch}
                      ></div>
                      <span className='ml-5 font-medium overflow-hidden mr-2 w-32'>
                        Subtask
                      </span>
                    </div>
                    <div className='container pr-2 mt-1'>
                      <SubtaskList
                        color={branch_color}
                        subtask={this.state.subtask}
                        DoneSub={this.handleSubDone}
                        delete={false}
                      ></SubtaskList>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    );
  }

  handleResize() {
    if(window.innerWidth >= 1024) {
      this.setState({screen_wide: true})
    } else {
      this.setState({screen_wide: false})
    }
  }

  handleDraw(index, task_id, branch_color, mother_id, x, y) {
    this.props.onDraw(index, task_id, branch_color, mother_id, x, y);
  }

  handleSubExpand() {
    this.setState({ open: !this.state.open });
  }

  handleTaskDone(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    if (this.state.achieved == true) {
      this.props.onTaskUndone(this.props.task._id, this.props.index);
      this.setState({ achieved: false });
      // if the line is shared!
      if (this.props.line.is_share) {
        getNodesByLine(this.props.line._id, 0, 1000, 0).then((task) => {
          task[this.state.index].achieved = !task[this.state.index].achieved;
          let consecutive = task
            .map((p) => {
              return p.achieved;
            })
            .indexOf(false);
          if (consecutive != -1) {
            setShareProgress(
              this.props.line.sharerLineId,
              this.props.userId,
              consecutive - 1
            ).then(() => {
              getShareProgress(this.props.line.sharerLineId).then(
                (progress) => {
                  const usersObj = progress.shareder
                    .filter(
                      (element) =>
                        element.shareder_progress == this.state.index &&
                        element.shareder_user_id != this.props.userId
                    )
                    .map((p) => {
                      return p.shareder_user_id;
                    });
                  this.setState({ progress_users: usersObj });
                }
              );
            });
          }
        });
      }
    } else {
      const now = new Date();
      this.props.onTaskDone(this.props.task._id, now, this.props.index);
      this.setState({ achieved: true });
      // if the line is shared!
      if (this.props.line.is_share) {
        getNodesByLine(this.props.line._id, 0, 1000, 0).then((task) => {
          task[this.state.index].achieved = !task[this.state.index].achieved;
          let consecutive = task
            .map((p) => {
              return p.achieved;
            })
            .indexOf(false);
          if (consecutive != -1) {
            setShareProgress(
              this.props.line.sharerLineId,
              this.props.userId,
              consecutive - 1
            ).then(() => {
              getShareProgress(this.props.line.sharerLineId).then(
                (progress) => {
                  const usersObj = progress.shareder
                    .filter(
                      (element) =>
                        element.shareder_progress == this.state.index &&
                        element.shareder_user_id != this.props.userId
                    )
                    .map((p) => {
                      return p.shareder_user_id;
                    });
                  this.setState({ progress_users: usersObj });
                }
              );
            });
          } else {
            setShareProgress(
              this.props.line.sharerLineId,
              this.props.userId,
              task.length - 1
            ).then(() => {
              getShareProgress(this.props.line.sharerLineId).then(
                (progress) => {
                  // filter self: add one more .filter(element => element.shareder_progress == this.state.index)
                  const usersObj = progress.shareder
                    .filter(
                      (element) =>
                        element.shareder_progress == this.state.index &&
                        element.shareder_user_id != this.props.userId
                    )
                    .map((p) => {
                      return p.shareder_user_id;
                    });
                  this.setState({ progress_users: usersObj });
                }
              );
            });
          }
        });
      }
    }
  }

  handleSubDone(value, done, id) {
    let data = qs.stringify({
      subtask: `${value}`,
      done: `${done}`,
      subtaskIdx: `${id}`,
    });
    modifySubTask(this.props.task._id, data).then(() => {
      getNode(this.props.task._id).then((node) => {
        this.setState({ subtask: [...node.subtask] });
      });
    });
  }

  handleTaskEdit() {
    console.log('Edit: ' + this.props.task._id);
    // Dynamic Routing
    Router.push(
      {
        pathname: '/task-edit/[taskId]',
        query: { taskId: this.props.task._id },
      },
      '/task-edit/[taskId]'
    );
  }

  RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
  }
}

export default TaskItem;
