import React from 'react';

const COLOR = {
  white: '#ffffff',
};
const NODE = {
  space: 74,
  radius: 11,
  head_radius: 15,
};
const LINE = {
  begin_x: 30,
  begin_y: 11,
  space: 40,
  v_space: 90,
  width: 5,
  curve: NODE.space / 2,
  opacity: 0.8,
  branchView_y_space: 0,
};

class Drawer {
  constructor(svg, bottom) {
    this.snap = Snap(svg);
    this.bottom = bottom;

    this.snap.clear();

    this.drawLine = this.drawLine.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.drawHorizontal = this.drawHorizontal.bind(this);
    this.drawVertical = this.drawVertical.bind(this);
    this.drawNode = this.drawNode.bind(this);
  }

  drawLine(state, line, x, y) {
    if (line.is_host === true)
      this.drawVertical(line, x, y - LINE.width / 2, this.bottom);
    else {
      if (line.is_main)
        this.drawHorizontal(line, LINE.begin_x + LINE.width / 2, state ? x :LINE.begin_x + LINE.width / 2 + 20, y);
      else this.drawHorizontal(line, LINE.begin_x + LINE.width / 2, state ? x :LINE.begin_x + LINE.width / 2 + 20, y);
      if(state) {
        this.drawVertical(line, x, y - LINE.width / 2, this.bottom);
        let node = { color: line.color, achieved: true };
        this.drawNode(node, x, y);
      }
    }
  }

  drawHorizontal(line, x1, x2, y) {
    this.snap.line(x1, y, x2, y).attr({
      stroke: line.color,
      strokeWidth: LINE.width,
      opacity: LINE.opacity,
    });
  }

  drawVertical(line, x, y1, y2) {
    this.snap.line(x, y1, x, y2).attr({
      stroke: line.color,
      strokeWidth: LINE.width,
      opacity: LINE.opacity,
    });
  }

  drawNode(node, x, y) {
    //    console.log(node.color, x, y);
    this.snap.circle(x, y, NODE.radius).attr({ fill: node.color });
    //    this.snap.circle(x, y, NODE.radius * 0.7).attr({ fill: COLOR.white });

    //    if (node.achieved) {
    //      this.snap.circle(x, y, NODE.radius * 0.5).attr({ fill: node.color });
    //    }
  }
}
class SvgBranchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen_wide: false,
    };
    
    this.svg = React.createRef();

    this.handleResize = this.handleResize.bind(this);
    this.getIndexOfTaskById = this.getIndexOfTaskById.bind(this);
    this.getIndexOfLineById = this.getIndexOfLineById.bind(this);
    //    this.getDataFromProps = this.getDataFromProps.bind(this);
    this.colorArrayToHex = this.colorArrayToHex.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
    const Snap = require('snapsvg-cjs');
    let { lines } = this.props;
    this.svgRender(lines);
  }
  componentDidUpdate() {
    const Snap = require('snapsvg-cjs');
    let { lines } = this.props;
    this.svgRender(lines);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize())
  }

  svgRender(linesObj) {
    console.log('Rerender~');
    console.log(linesObj);
    if (linesObj === undefined) return;
    let TOP = this.svg.current.getBoundingClientRect().top;
    let BOTTOM = this.svg.current.getBoundingClientRect().bottom;

    let lines = [];
    for (let line of linesObj) {
      if (line._id === '0' || line.owner === 'you') continue;
      console.log(line);
      lines.push({
        _id: line.Line._id,
        is_main: line.Line.is_main,
        color: this.colorArrayToHex(line.Line.color_RGB),
        create_date: line.Line.create_date,
        //mother: line.mother._id,
      });
    }
    lines.sort((a, b) => -(a.create_date < b.create_date));

    let x, y;
    let drawer = new Drawer(this.svg.current, BOTTOM);

    // Draw Main Line
    x = LINE.begin_x;
    y = LINE.begin_y + 30;
    let line;

    let node = { color: '#000000', achieved: true };
    drawer.drawNode(node, x, y);
    line = { is_host: true, color: '#000000', x: x };
    //    drawer.drawLine(line, 0, x, y);
    drawer.drawLine(this.state.screen_wide, line, x, y);
    x += LINE.space;
    y += this.state.screen_wide ? LINE.v_space : LINE.v_space + 20;

    y += 70;
    for (let i = 0; i < lines.length; i++) {
      line = lines[i];
      //            console.log(line.mother);
      //            if (line.is_main) drawer.drawLine(line, LINE.begin_x, x, y);
      //            else
      //      drawer.drawLine(
      //        line,
      //        this.lines[this.getIndexOfLineById(lines, line.mother)]['x'],
      //        x,
      //        y
      //      );
      if(!this.state.screen_wide) {
        let node = { color: line.color, achieved: true };
        drawer.drawNode(node, LINE.begin_x + LINE.width / 2 + 20, y);
      }
      drawer.drawLine(this.state.screen_wide, line, x, y);
      lines[i]['x'] = x;
      x += LINE.space;
      y += this.state.screen_wide ? LINE.v_space : LINE.v_space + 20;
    }
    //    console.log(lines);
  }

  getIndexOfTaskById(tasks, _id) {
    for (let i = 0; i < tasks.length; i++) if (tasks[i]._id === _id) return i;
    return null;
  }
  getIndexOfLineById(lines, _id) {
    for (let i = 0; i < lines.length; i++) if (lines[i]._id === _id) return i;
    return null;
  }
  colorArrayToHex(arr) {
    let hex =
      '#' + arr.map((c) => ('0' + (c & 0xff).toString(16)).slice(-2)).join('');
    //      console.log(colorCode);
    return hex;
  }

  render() {
    if (this.svg.current !== null) {
      const Snap = require('snapsvg-cjs');
      this.svgRender();
    }
    return (
      <svg
        ref={this.svg}
        className='top-5 left-0 h-5/6 absolute sm:w-2/5 w-1/5'
        xmlns='http://www.w3.org/2000/svg'
        lines={this.props.lines}
        tasks={this.props.tasks}
        positions={this.props.positions}
      />
    );
  }

  handleResize() {
    if(window.innerWidth >= 768) {
      this.setState({screen_wide: true}, () => {
        const Snap = require('snapsvg-cjs');
        this.svgRender();
      })
    } else {
      this.setState({screen_wide: false}, () => {
        const Snap = require('snapsvg-cjs');
        this.svgRender();
      })
    }
  }
}

export default SvgBranchView;
