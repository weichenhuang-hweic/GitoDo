import React from 'react';
import {connect} from 'react-redux';
import AccountContent from './ProfileContent/AccountContent';
import {getUser} from '../../api/user';

class Profile extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      avatar_url: '',
    }

    getUser(this.props.userId).then(userId => {
      this.setState({
        avatar_url: userId.avatar_url,
    })
    }).catch(err => {
        console.error('Error while getUser', err);
    });
  }

  render() {
    
    return(
      <>
      <div className="lg:ml-40 md:ml-28">
        <div className="mx-5 sm:mx-10 w-auto xs:px-10 pt-28 container flex-col flex">
          <AccountContent></AccountContent>
        </div>   
      </div>
        
      </>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.login.userId
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);  // handleSubmit(event) {