import React,{Component} from "react";
import Box from "./Box";
import NavigationBar from "./NavigationBar";
import FooterBar from "./FooterBar";
import {Link} from "react-router-dom";

/* Returns all shade for chosen color */
class ColorShades extends Component{
    constructor(props){
        super(props)
        this._shade = this.allShades(this.props.palette, this.props.colorId);
        this.state = {format: "hex"};
        this.changeCodeType = this.changeCodeType.bind(this);
    }

    allShades(palette, colorId){
        let currentShades = [];
        let paletteColors = palette.colors;
        for (let ct in paletteColors){
            currentShades = currentShades.concat(
                paletteColors[ct].filter(color => color.id === colorId)
            )
        }
        return currentShades.slice(1);
    }

    /* function to change current color-code type */
    changeCodeType(val){
        this.setState({format:val});
    }   


    render(){
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;    
        const boxes = this._shade.map(color => (
            <Box key={color.name} name={color.name} background={color[format]} show={false}/>
        ))

        return(
            <div className="SingleShade Palette">
                <NavigationBar handleCodeChange = {this.changeCodeType} singleColorShades={true}/>
                <div className="Palette-colors">
                    {boxes}

                {/* Return button to go back to color palette from color shades */}
                <div className="return-to-palette Box"> 
                    <Link to={`/palette/${id}`} className="return-button"> Return </Link>
                </div>

                </div>
                <FooterBar paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default ColorShades;