import React from 'react';
import {connect} from 'react-redux';

class NavAdd extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false
    };
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
    return(
      <>
        <div className='mr-3 relative'>
          <button className={'p-1 pt-2 text-gray-500 hover:text-black focus:outline-none outline-none transform delay-70 transition-all origin-center'+ (this.state.dropdown && this.props.userId != '-1' ? ' rotate-45' : ' rotate-0')} onClick={this.openMenu}>
            <span className='material-icons pt-1'>add</span>
          </button>

          {(this.state.dropdown && this.props.userId != '-1') ? (
            <div className='backdrop-filter backdrop-blur-md bg-white absolute top-13 right-0 shadow-lg py-2 my-6 mx-4 rounded-lg text-black ring-2 ring-red-500'>
              <a href='/main/newtask'><button className='block focus:outline-none outline-none'><div className='px-3 py-1 hover:bg-red-500 hover:text-white w-36 text-left text-sm'>New Task</div></button></a>
              <a href='/main/newbranch'><button className='block focus:outline-none outline-none'><div className='px-3 py-1 hover:bg-red-500 hover:text-white w-36 text-left text-sm'>New Branch</div></button></a>
              <a href='/main/importbranch'><button className='block focus:outline-none outline-none'><div className='px-3 py-1 hover:bg-red-500 hover:text-white w-36 text-left text-sm'>Import Branch</div></button></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavAdd);