import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./css/NavigationBar.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";

/* Used external modules - MaterialUI, RC-slider */ 

class NavigationBar extends Component{

  constructor(props){
      super(props);
      this.state = {format: "hex", open: false};
      this.handleCodeChange = this.handleCodeChange.bind(this);
      this.popupClose = this.popupClose.bind(this);
  }

  /* Helper function that changes color code format from one code type to another
     Available color code values - Hexcode, RGB, RGBA */
  handleCodeChange(ct){
      this.setState({format: ct.target.value, open:true});
      this.props.handleCodeChange(ct.target.value);
  }

  /* Helper function to close popup which shows up whenever color code type is changed */
  popupClose(){
      this.setState({open: false});
  }

  render() {
      const { shade, changeShade, singleColorShades} = this.props;
      const {format} = this.state;
      return (
          <header className='navigation-bar'>
              <div className='navigation-logo'>
                <Link to="/"> Color-Pick </Link>
                  
              </div>

              {/* Navbar with minimum shade value of 100, maximum 1000 and each breakpoint in slider change value by 100
              Higher the shade, darker the shade/hue of that color
              */}
            {!(singleColorShades) &&
                <div className='navigation-slider-container'>
                    <span> Shade: {shade} </span>
                    <div className='navigation-slider'>
                        <Slider
                            defaultValue={shade}
                            min = {100}
                            max = {900}
                            step = {100}
                            onAfterChange={changeShade}
                        />
                  </div>
                </div>
            } 

            {/* Select container deals with drop down menu which changes color code type that user can copy
                  Available color code types - Hex, RGB, RGBA */
            }
                <div className='select-container'>
                  <Select value={format} onChange={ this.handleCodeChange}>
                      <MenuItem value="hex">HEX - #000000</MenuItem>
                      <MenuItem value="rgb">RGB - rgb(0, 0, 0)</MenuItem>
                      <MenuItem value="rgba">RGBA - rgba(0,0,0,0.0)</MenuItem>
                  </Select>
                </div>

                {/* Snackbar deals with popup which shows up whenever user changes the color code type
                    It is small screen notification on bottom-left side. 
                    Onclose action deals with how user can close popup window by clicking close button */}
                <Snackbar 
                    anchorOrigin = {{vertical: "bottom", horizontal:"left"}} 
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="popup-message"> Color Code type changed to {format} </span>}
                    ContentProps = {{
                      "aria-describedby":"popup-message"
                    }}
                  onClose = {this.popupClose}
                  action = {[<IconButton 
                      onClick={this.popupClose} 
                      color='inherit'
                      key= 'close'
                      aria-label='close'
                  > 
                      <CloseIcon/> 
                  </IconButton>]}
              /> 

          </header>
      )
  }
}

export default NavigationBar