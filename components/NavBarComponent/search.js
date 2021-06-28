import React from 'react';
import Router from 'next/router';

export default class Search extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchStatus: false,
      searchText: '',
    };

    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
  }

  render() {
    return(
      <>
        <div className='flex-row inline-flex relative group'>
          <input type='text' className='p-1 mx-3 border-solid border-gray-300 border-2 rounded-lg hover:border-red-500 focus:border-red-500 outline-none px-2 transition-transform' 
              placeholder='Search' onKeyPress={this.handleSearchKeyPress}></input>
          <button type='submit' className='text-gray-400 outline-none focus:outline-none absolute right-5' onClick={this.handleClick}>
            <span className='pt-2 material-icons '>search</span>
          </button>
        </div>
      </>
    );
  }

  handleSearchKeyPress(e) {
    let keyCode = e.keyCode || e.which;
    this.setState({
      searchText: e.target.value,
    });
    if(keyCode === 13 && e.target.value !=  '') {
      Router.push({
        pathname: '/search',
        query: { searchText: e.target.value}
      });
    }
  }
}