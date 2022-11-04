import React, { Component } from "react";
import Box from "./Box";
import NavigationBar from "./NavigationBar";
import "./css/Palette.css";
import FooterBar from "./FooterBar";

class Palette extends Component {
  
  /* Start defual shade leve with value 400 */
  constructor(props) {
    super(props);
    this.state = { level: 400, format: "hex" };
    this.changeShade = this.changeShade.bind(this);
    this.changeCodeType = this.changeCodeType.bind(this);
  }
  /* Function to change current shade level value */
  changeShade(level){
    this.setState({level});
}

/* function to change current color-code type */
changeCodeType(val){
    this.setState({format:val});
}   
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;

    /* Create a array of all the color of selected palette for current shade. 
            Key is id because id is unique for each palette*/
    const colorBoxes = colors[level].map(color => (
      <Box background={color[format]} name={color.name} 
        key={color.id} 
          currentUrl={`/palette/${id}/${color.id}`}
            show={true}/>
    ));
    return (
      <div className='Palette'>
        <NavigationBar
          shade={level}
          changeShade={this.changeShade}
          handleCodeChange={this.changeCodeType}
          singleColorShades = {false}
        />
        <div className='Palette-colors'>{colorBoxes}</div>

        <FooterBar paletteName={paletteName} emoji={emoji}/>
        
      </div>
    );
  }
}
export default Palette;