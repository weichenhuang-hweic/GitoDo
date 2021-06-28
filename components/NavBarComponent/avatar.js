import React from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../api/user';

class Avatar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      name: '',
    };

    if(this.props.userId != '-1'){
      getUser(this.props.userId).then(userId => {
        this.setState({
          name: userId.name, 
      })
      }).catch(err => {
          console.error('Error while getUser', err);
      });
    }
    
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu)
  }

  openMenu(syntheticEvent){
    syntheticEvent.stopPropagation()
    this.setState({dropdown: !this.state.dropdown}, () => {
      if(this.state.dropdown) {
        window.addEventListener('click', this.closeMenu)
      }
    });
  }

  closeMenu() {
    this.setState({dropdown: false}, () => {
      window.removeEventListener('click', this.closeMenu)
    });
  }

  

  render() {
    let url = this.props.avatar;
    if(!this.props.avatar) {
      url = '/user.jpg';
    }
    return(
      <>
        <div className='relative'>
        <button className='inline-flex items-end mr-2 text-gray-500 hover:text-black focus:outline-none outline-none pt-2'onClick={this.openMenu}>
          { <img src={url} className="ring-2 ring-gray-300 inline shadow-sm rounded-full h-6 w-6 overflow-hidden"></img>}
        </button>

          {(this.state.dropdown && this.props.userId != '-1') ? (
            <div className='absolute top-15 right-0 bg-white shadow-lg py-3 pt-1 my-6 mx-4 rounded-lg text-black ring-2 ring-red-500 text-sm w-32'>
              <div className='px-4 py-1 border-b-2 border-red-300'>Hello, {this.state.name}</div>
              <a href='/profile/account'><div className='pt-2 px-4 py-1 hover:bg-red-500 hover:text-white'>Settings</div></a>
              <a href='/login'><div className='px-4 py-1 hover:bg-red-500 hover:text-white'>Log Out</div></a>
            </div>
          ) : (null)}
        </div>
      </>
    );
  }
  
}

const mapStateToProps = state => ({
  userId: state.login.userId,
  avatar: state.login.avatar_uri,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar); 
