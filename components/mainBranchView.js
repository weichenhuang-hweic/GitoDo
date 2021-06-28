import BranchItem from './ShareComponent/branchItem';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class MainBranchDisplay extends React.Component{
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
    if (allLine.length > 1) {
      allLine.shift();
      allLine.shift();
      children = allLine.map((p, index) => (
        <ListGroupItem key={p.Line._id} action>
          <BranchItem {...p} index={index} userId={this.props.userId} onDraw={this.handleDraw}/>
        </ListGroupItem>
      ));
    }

    return (
      <div className='pt-40 md:ml-80 lg:mr-10 ml-16 mr-1 p-5'>
        <ListGroup>
          {children}
        </ListGroup>
        {this.props.allLine.length <= 2 &&
            <a href='/main/newbranch'>
            <div className='container shadow rounded-lg flex-row py-5 my-3 px-5 flex items-center text-gray-700 bg-white cursor-pointer hover:bg-gray-50'>
              <div className={`inline ml-5 h-4 w-0.5`}></div>
              <span className='material-icons ring-2 ring-gray-700 rounded-full'>add</span>
              <span className='sm:ml-5 ml-3 font-semibold sm:w-36 w-auto overflow-hidden' onClick={this.handleSubExpand}>Go add a branch!</span>
            </div>
            </a>
          }
      </div>
    );
  }

  handleDraw(index, line_id, branch_color, x, y) {
    let allLine = [...this.props.allLine]
    allLine.shift();
    allLine.shift();
    this.props.onDraw(index, line_id, branch_color, x, y, allLine.length);
  }
}