import React from 'react';
import {getUser} from '../../api/user';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class SearchBranchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {owner: '', re: false, copied: false};

    this.RGBToHex = this.RGBToHex.bind(this);
  }

  componentDidMount() {
    getUser(this.props.owner).then(user => {
      this.setState({owner: user.name})
    })
  }

  render() {
    let Link = 'gitodo.com/import/' + this.props._id;
    const {color_RGB, title} = this.props;
    const branch_color = this.RGBToHex(color_RGB[0], color_RGB[1], color_RGB[2]);
    const stylebranch = {
      backgroundColor: branch_color,
      '--tw-ring-color': branch_color
    }
    return (
      <>
        <div className='container shadow rounded-lg p-3 py-5 px-4 my-3 flex-row flex items-center cursor-pointer bg-white'>
          <div ref={node => this.node = node} className={`sm:ml-5 h-4 w-0.5 ring-2`} style={stylebranch}></div>
          <span className='ml-5 font-semibold overflow-hidden sm:text-lg text-sm sm:w-60 w-32'>{title}</span>
          <div className='hover-trigger relative sm:mx-2 mx-1 pt-2'>
            <span className='material-icons text-green-600'>attribution</span>
            <span className='backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-lg p-1 px-2 text-sm bg-gray-800 text-white absolute top-10 right-2 text-center z-10 hover-target'>Owner{' ' + this.state.owner}</span>
          </div>
          <div className='flex-grow'></div>
          <div className='flex-col flex sm:ml-5 ml-2 w-40'>
            <div className='mx-auto'>
            <CopyToClipboard text={Link} onCopy={() => this.setState({copied: true})}>
              <button onClick={() => {event.preventDefault();}} className='bg-blue-100 text-blue-800 text-sm rounded-md p-2 focus:outline-none hover:bg-blue-600 hover:text-white'>
              {this.state.copied ? 'Copied' : 'Copy link'}
              </button>
            </CopyToClipboard>
            </div>
            {<span className='text-center mt-0.5 text-gray-400 text-xs'>{this.state.copied ? '*Go to import page to import this line.' : '*Click to copy URL'}</span>}
          </div>
        </div>
      </>
    );
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