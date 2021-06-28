import SearchBranchItem from './ShareComponent/searchbranchItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainSearchDisplay extends React.Component{
  constructor(props) {
    super(props);

    this.state = ({});

    this.handleDraw = this.handleDraw.bind(this);
  }

  render() {
    let allLine = [...this.props.allLine]
    if(!allLine) allLine = [];
    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div></div>
      </ListGroupItem>
    );
    if (allLine.length > 0) {
      children = allLine.map((p, index) => (
        <ListGroupItem key={p._id} action>
          <SearchBranchItem {...p} index={index} userId={this.props.userId} onDraw={this.handleDraw}/>
        </ListGroupItem>
      ));
    }

    return (
      <div className='pt-40 mx-auto p-5'>
        <ListGroup>
          {children}
        </ListGroup>
      </div>
    );
  }

  handleDraw(index, line_id, branch_color, x, y) {
    let allLine = [...this.props.allLine]
    this.props.onDraw(index, line_id, branch_color, x, y, allLine.length);
  }
}