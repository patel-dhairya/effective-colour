import React, {Component} from "react";
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import { withStyles} from "@material-ui/core/styles";
import EmptyPaletteSave from "./EmptyPaletteSave";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import style from "./styles/EmptyPaletteNavigationBarStyle";

/* This class deals with navigation bar component in Empty Palette or Create a new palette page */
/* Main functionality includes saving the user palette with given name */


class EmptyPaletteNavigationBar extends Component{
    constructor(props){
        super(props);
        this.state={createPaletteName: "", showSaveScreen: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleShowSaveScreen = this.handleShowSaveScreen.bind(this);
        this.handleCloseSaveScreen = this.handleCloseSaveScreen.bind(this);
    }

    componentDidMount(){
        /* Check if palette name is already not taken */
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
          this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        ); 
    }
  
    handleShowSaveScreen(){
      this.setState({showSaveScreen:true})
    }

    handleCloseSaveScreen(){
      this.setState({showSaveScreen: false})
    }

     /* Helper function to name the color */
     handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    render(){
        const {classes, open, palettes, saveColorPaletteSubmit, handleDrawerOpen} = this.props;
        const {showSaveScreen} = this.state;
        return(
            <div className={classes.root}>
            <CssBaseline />
                <AppBar
                position="fixed"
                color="default"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <ChevronRightIcon/> 
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    Create Palette
                    </Typography>

                
                </Toolbar>

                  <div className={classes.barButtons}>

                  
                    {/* Button to return to home page */}
                    <Link to="/">
                        <Button className = {classes.barButton} variant="contained" color="secondary">
                            Home
                        </Button>
                    </Link>

                    <Button 
                        className = {classes.barButton}
                        variant="outlined" 
                        color="primary" 
                        onClick={this.handleShowSaveScreen}
                    >
                        Save
                    </Button>

                  </div>

                </AppBar>

                {(showSaveScreen) && (
                  <EmptyPaletteSave 
                    palettes={palettes} 
                    saveColorPaletteSubmit={saveColorPaletteSubmit}
                    handleCloseSaveScreen = {this.handleCloseSaveScreen}
                  />
               )}
            </div>
        )
    }
}


export default withStyles(style, {withTheme:true})(EmptyPaletteNavigationBar);