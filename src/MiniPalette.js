import React, {PureComponent} from "react";
import { withStyles } from "@material-ui/styles";
import style from "./styles/MiniPaletteStyle";
import DeleteIcon from "@material-ui/icons/Delete";

/* Create MiniPalette for home screeen
    MiniPalette shows levelshade 400 colors available in palette with name and emoji of palette  */

class MiniPalette extends PureComponent{
    constructor(props){
        super(props);
        this.handleDeletePalette = this.handleDeletePalette.bind(this);
    }

    /* Call the delete function in PaletteList to remove Palette */
    handleDeletePalette(event){
        event.stopPropagation();
        this.props.openDeleteDialog(this.props.id);
    }

    render(){
        const {classes, paletteName, emoji, colors, onPaletteClick, id} = this.props;
        const miniPaletteBox = colors.map(color => (
            <div 
                className={classes.miniColors}
                style={{backgroundColor: color.color}}
                key={color.name}    
            />
        ));

        return(
            /* By clicking on palette, user will be redirected to the big palette version of selected one */
            <div className={classes.root} onClick={()=>onPaletteClick(id)}>
                
                {/* Button to delete Palette from Palette list */}
                <DeleteIcon className={classes.deleteIcon} onClick={this.handleDeletePalette}/>

                <div className={classes.colors}>
                    {miniPaletteBox}
                </div>
                <div className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </div>
            </div>
        )
    }
}

export default withStyles(style)(MiniPalette);