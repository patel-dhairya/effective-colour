import React, { Component } from "react";
import { SketchPicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {withStyles} from "@material-ui/core/styles";
import style from "./styles/EmptyPaletteColorPickerStyle"

/* This class handles color pick component on for Empty Palette file 
    Part of EmptyPalette.js    */

class EmptyPaletteColorPicker extends Component{
    constructor(props){
        super(props);
        this.state = {initialColor:"pink", createColorName: ""};
        this.updateColor = this.updateColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddColor = this.handleAddColor.bind(this);
    }

    /* Add new color */
    updateColor(newColor){
        this.setState({initialColor: newColor.hex});
    }

    /* Helper function to update the value */
    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    /* Pass the required value for adding color to main function in Parent file*/
    handleAddColor(){
        const newSelectedColor = {
            color: this.state.initialColor,
            name: this.state.createColorName
        }
        this.props.addColor(newSelectedColor);
        this.setState({createColorName: ""});
    }

    componentDidMount(){
        /* Check if color name is already not taken */
        ValidatorForm.addValidationRule("isColorNameUnique", value => 
          this.props.selectedColors.every(
            ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        /* Check if color is not already selected by user */
        ValidatorForm.addValidationRule("isColorUnique", value => 
          this.props.selectedColors.every(
            ({color}) => color  !== this.state.initialColor
            )
        );       
      }

    render(){
        const {isPaletteFull, classes} = this.props;
        const {initialColor, createColorName } = this.state;
        return(
            <div>
                
                {/* Color choice options for user to pick their favourite color*/}
                <SketchPicker 
                    color={initialColor} 
                    onChangeComplete={this.updateColor}
                    className= {classes.colorPicker}
                />
            
                <ValidatorForm onSubmit={this.handleAddColor} ref='form' instantValidate={false}>
                <TextValidator 
                    className={classes.colorNameText}
                    placeholder = "Enter Color Name"
                    value={createColorName} 
                    name='createColorName'
                    onChange={this.handleChange}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={["Color name is required","Color name already exist", "Color already exist"]}
                    variant='filled'
                    margin='normal'
                />

                {/* Button for user to select color and add it to custom palette 
                    Disable button if already 20 colors are selected*/}
                <Button 
                className = {classes.addColorButton}
                variant="contained" 
                color="primary" 
                style={{backgroundColor:isPaletteFull? "white":initialColor}}
                type="submit"
                disabled = {isPaletteFull}
                >
                {isPaletteFull ? "Palette Full": "Add"}
                </Button>
                
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(style)(EmptyPaletteColorPicker);