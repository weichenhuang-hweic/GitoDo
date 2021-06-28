import React from 'react';
import {getUser, searchUsers} from '../../api/user'
import {addNode} from '../../api/node'
import {shareLine} from '../../api/line'
import {connect} from 'react-redux'

let qs = require('qs');
class ShareBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: '', result: [], sharer: [], alreadyChoose: false};
    
    this.handleChooseSharer = this.handleChooseSharer.bind(this);
    this.handleDeleteSharer = this.handleDeleteSharer.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.RGBToHex = this.RGBToHex.bind(this);
  }

  render(){
    const branch_color = this.props.color ? this.RGBToHex(this.props.color[0], this.props.color[1], this.props.color[2]) : '#ffffff';
    const stylebar = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color
    }
    const userList = this.state.result.map((user) => {
      return (
          <button onClick={() => {this.handleChooseSharer(user)}} className='block focus:outline-none outline-none w-full' key={user._id}><div className='px-3 py-2 hover:bg-red-500 hover:text-white text-left text-md rounded-lg pl-10'>{user.name}, {user.email}</div></button>
      )
    })
    const shareList = this.state.sharer.map((sharer, index) => {
      return (
        <div className='hover-trigger relative sm:m-0 mx-2' key={sharer._id}>
          <button onClick={() => {this.handleDeleteSharer(sharer)}} className='rounded-full' key={index}><img src={sharer.avatar_url} className="ring-2 ring-gray-300 inline shadow-sm rounded-full h-6 w-6 overflow-hidden"></img></button>
          <span className='bg-opacity-90 rounded-lg p-1 px-2 text-sm text-center bg-gray-800 text-white absolute top-10 right-2 hover-target'>{sharer.name},&nbsp;{sharer.email} Click&nbsp;to&nbsp;remove</span>
        </div>
      )
    })
    return (
      <>
        <div className={`container shadow rounded-lg p-4 my-3 flex-col items-center cursor-default bg-white z-50 mt-10`}>
          <div className='container items-center flex'>
            <div className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebar}></div>
            <span className='ml-5 font-semibold overflow-hidden'>Share with Others</span>
          </div>
          <div className='ml-5 flex sm:flex-row flex-col p-5 px-20 items-center'>
            <div className='w-60 flex-row flex'>
              <span className='text-center w-48'>Plan to Invite Users:&nbsp;&nbsp;</span>
            </div>
            <div className='w-60 flex-row flex'>
              {shareList}
            </div>
            <div className='sm:flex-grow' />
            <button onClick={this.handleShare} className='bg-gray-300 hover:bg-gray-600 text-gray-600 hover:text-white rounded-lg focus:outline-none w-auto p-3 py-1 my-1'>
                <span>Invite</span>
            </button>
          </div>
          <div className='flex flex-col w-auto sm:mx-20 mx-5'>
              <input className='my-0 text-center bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
              placeholder='Search User Name' value={this.state.value} onChange={this.handleChange}
              ></input>
              {this.state.result.length > 0 && <div className='bg-opacity-90 rounded-lg text-sm ring-2 ring-red-500 bg-white mt-5 overflow-scroll max-h-32'>{userList}</div>}
          </div>
        </div>
      </>
    )
  }
  
  handleShare() {
    for(let i = 0; i < this.state.sharer.length; i++) {
      const now = new Date();
      const userId = this.state.sharer[i]._id;
      getUser(userId).then(user => {
        let node_data = qs.stringify({
          'mother_line_id': `${user.todo_host}`,
          'create_date': `${now}`,
          'due_date': `${now}`,
          'title': `${this.props.branchName}`,
          'url': `${null}`,
          'content': `${null}`,
          'importance': '0',
        })
        addNode(node_data).then(node => {
          let data = qs.stringify({
            'sharerLineId': `${this.props.lineId}`,
            'sharederUserId': `${userId}`,
            'sharederNodeId': `${node._id}` 
          });
          console.log(data)
          shareLine(data).then(shareObj=>{
            console.log(shareObj)
          })
        })
      })
    } 
    this.setState({sharer: []});
    this.setState({value: ''});
    this.setState({result: []});
    event.preventDefault();
  }

  handleChange (event) {
    this.setState({value: event.target.value})
    if(event.target.value) {
      searchUsers(event.target.value, 0, 10).then(result => {
        this.setState({result: result})
      })
    } else{
      this.setState({result: []})
    }
  }

  handleChooseSharer(user) {
    if(this.state.sharer.indexOf(user._id) == -1){
      this.setState({sharer: [...this.state.sharer, user]});
      this.setState({value: ''});
      this.setState({result: []});
    }
  }

  handleDeleteSharer(sharer) {
    let new_sharer = this.state.sharer.filter(element => element._id != sharer._id);
    this.setState({sharer: new_sharer});
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
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  mainLine: state.branch.mainLine,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareBlock);