import React from 'react';
import Link from 'next/link';
import {logIn, getUser} from '../api/user';
import { Button } from 'reactstrap';
import Router from 'next/router';
import {connect} from 'react-redux';
import {loginSuccess, userAvatar, clearUser} from '../redux/actions/loginAction';
import {listMainBranch, clear} from '../redux/actions/branchActions';

let qs = require('qs');

class LoginView extends React.Component{
  static getInitialProps() {}

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.props.clearData();
    this.props.clearUser();
  }

  render() {
    // TODO: forget password!
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='sm:top-20 top-16 px-10 absolute w-auto'>
            <div className='container flex flex-row mx-auto items-center'>
              <h1 className='text-2xl font-semibold'></h1>
              <div className='flex-grow' />
            </div>
          </div>
          <div className='sm:pt-12 sm:mx-20 mx-1 p-5'>
            <div className='container flex flex-col shadow bg-white rounded-lg py-5'>
              <h1 className='text-2xl font-semibold mx-auto mt-5'>Welcome Back.</h1>
              <h1 className='text-md font-normal mx-auto my-2 text-gray-500'>*Login to use everything.</h1>
              <div className='container flex flex-col ring-2 ring-gray-200 mx-auto sm:w-96 w-auto rounded-lg p-2 mb-5'>
                <span className='ml-5 my-2'>Account</span>
                <input type='text' className='text-left mx-5 my-3 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                value={this.state.username} onChange={this.handleUserChange} required></input>
                <div className='flex-row flex ml-5 my-2 mr-5 items-center'>
                  <span>Password</span>
                  <div className='flex-grow'></div>
                  <span className='cursor-pointer text-blue-700 hover:underline sm:text-base text-xs'>Forgot Password?</span>
                </div>       
                <input type='password' className='text-left mx-5 my-3 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' 
                value={this.state.password} onChange={this.handlePassChange} required></input>
                <Button className='ring-2 ring-green-500 mx-5 my-2 rounded-md py-2 bg-green-200 text-green-800 hover:bg-green-600 hover:text-white'>Sign in</Button>
              </div>
              <h1 className='text-md font-normal mx-auto mb-10'>First time?&nbsp;&nbsp;
                <Link href='/signup'>
                  <a>
                   <span className='cursor-pointer text-blue-700 hover:underline'> Create one.</span>
                  </a>
                </Link>
              </h1>
              <p className='text-sm text-gray-500 sm:w-96 text-center mx-auto sm:px-1 px-5'>Sign in to GitoDo means you agree to GitoDo&apos;s Terms of Service and
              acknowledge that GitoDo&apos;s Privacy Policy applies to you.</p>
            </div>
          </div>
        </form>
      </>
    );
  }

  handleUserChange(event) {
    this.setState({username: event.target.value});
  }

  handlePassChange(event) {
    this.setState({password: event.target.value});
  }
  
  handleSubmit(event) {
    /* TODO: add wrong login  */

    let data = qs.stringify({
      'account': this.state.username,
      'password': this.state.password
    });

    logIn(data).then(res => {
      //console.log(userId);
      if(res.status === 200) {
        this.props.loginSuccess(res.data);
        this.props.listMainBranch(res.data);
        getUser(res.data).then(user => {
          this.props.userAvatar(user.avatar_url);
        })
        Router.push({
          pathname: '/main',
          query: { userId: res.data},
        }, `/main`);
      } else {
        window.location.reload();
      }
    }).catch(err => {
      console.error('Error while logIn', err);
      window.location.reload();
    });

    event.preventDefault();
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {
  loginSuccess: loginSuccess,
  listMainBranch: listMainBranch,
  userAvatar: userAvatar,
  clearUser: clearUser,
  clearData: clear,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);