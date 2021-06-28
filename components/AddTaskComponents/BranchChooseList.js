import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BranchChooseItem from './BranchChooseItem';

class BranchChooseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {allLine: []};

    this.handleChooseBranch = this.handleChooseBranch.bind(this);
  }

  render() {
    let allLine = [...this.props.allLine]
    if(!allLine) allLine = [];
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (allLine.length > 1) {
      allLine.shift();
      children = allLine.map((p) => (
        <ListGroupItem key={p.Line._id} action>
          <BranchChooseItem {...p} ChooseBranch={this.handleChooseBranch} nowChoose={this.props.nowChoose}/>
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

  handleChooseBranch(title, id, color) {
    this.props.ChooseBranch(title, id, color);
  }
}

export default BranchChooseList;