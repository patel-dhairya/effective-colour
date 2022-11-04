import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {Link} from "react-router-dom";
import chroma from "chroma-js";

import "./css/Box.css";


/* Box class deals with each Color Box in opened Palette */

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = { is_copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  /* changeCopyState is helper function for user to copy color code value by clicking on that color */
  changeCopyState() {
    this.setState({ is_copied: true }, () => {
      setTimeout(() => this.setState({ is_copied: false }), 1500);
    });
  }

  render() {
    const { name, background, currentUrl, show} = this.props;
    const { is_copied } = this.state;

    /*To Change color of text to white if background color is dark and black if background color is light */
    const darkColor = chroma(background).luminance() <= 0.25;
    /* To change of color of more button depedning on background color */
    const lightColorMore = chroma(background).luminance() > 0.3;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className='Box'>
          <div
            style={{ background }}
            className={`copy-overlay ${is_copied && "show"}`}
          />
          <div className={`copy-message ${is_copied && "show"}`}>
            <h1>Color code is copied!</h1>
            <p className={!darkColor && "see-more-dark"}>{background}</p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>

              <span className={darkColor && "box-content-light"}>{name}</span>
            </div>

            {/* Copy button to copy color code */}
            <button className={`copy-button ${!darkColor && "see-more-dark"}`}>Copy</button>
          </div>
          
            {/* More button to open different shades */}
          {show && (
          <Link to={currentUrl} onClick={e => e.stopPropagation()}>
          <span className={`see-more ${lightColorMore && "see-more-dark"}`}>More</span>
          </Link>)}
        </div>
      </CopyToClipboard>
    );
  }
}
export default Box;