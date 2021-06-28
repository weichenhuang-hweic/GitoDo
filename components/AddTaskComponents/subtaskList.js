import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import SubtaskItem from './subtaskItem';

export default class SubtaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDelSubtask = this.handleDelSubtask.bind(this);
    this.handleDoneSubtask = this.handleDoneSubtask.bind(this);
  }

  render() {

    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (this.props.subtask) {
      children = this.props.subtask.map((p, index) => (
        <ListGroupItem key={index} action>
          <SubtaskItem {...p} id={index} DelSub={this.handleDelSubtask} DoneSub={this.handleDoneSubtask} color={this.props.color} delete={this.props.delete}/>
        </ListGroupItem>
      ));
    }

    return (
      <div className=''>
        <ListGroup>
          {children}
        </ListGroup>
      </div>
    );
  }

  handleDelSubtask(id) {
    this.props.DelSub(id);
  }

  handleDoneSubtask(value, done, id) {
    this.props.DoneSub(value, done, id);
  }
}