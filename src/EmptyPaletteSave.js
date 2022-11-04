import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

/* This section is responsbile for naming and saving user created palette
    Part of - EmptyPalette.js */

class EmptyPaletteSave extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentNameDetail: "name",
            createPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojis = this.showEmojis.bind(this);
        this.savePaletteEmoji = this.savePaletteEmoji.bind(this);
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount(){
        /* Check if palette name is already not taken */
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
          this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        ); 
    }

    /* Helper function to update the value */
    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    /* Function that show emoji picker */
    showEmojis(){
        this.setState({currentNameDetail: "emoji"});
    }

    /* Give name and emoji to new Palette and pass it to parent function of saving palette */
    savePaletteEmoji(emoji){
        const newPalette = {
            paletteName: this.state.createPaletteName,
            emoji: emoji.native
        };
        this.props.saveColorPaletteSubmit(newPalette)
        this.setState({currentNameDetail : ""});
    }

    render(){
        const {createPaletteName} = this.state;
        const {handleCloseSaveScreen} = this.props;

        return (
            <div>
                <Dialog open={this.state.currentNameDetail === "emoji"} onClose={handleCloseSaveScreen} >
                    <DialogTitle id='form-dialog-title'>
                        Pick a Emoji for your Palette
                    </DialogTitle>
                    {/* Load the emoji picker */}
                    <Picker 
                        data={data} 
                        onEmojiSelect={this.savePaletteEmoji}
                    />
                </Dialog>
                <Dialog 
                    open={this.state.currentNameDetail === "name"} 
                    onClose={handleCloseSaveScreen} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"> Save Palette </DialogTitle>
                    
                    <ValidatorForm onSubmit={this.showEmojis} ref="form">
                        <DialogContent>
                            <DialogContentText>
                                Enter unique Palette Name to save it
                            </DialogContentText>
                            
                            {/* Create textbox and button for user to save palette with custom name
                                Name can't be same for two palettes */}
                                <TextValidator 
                                    value={createPaletteName}
                                    label="New Palette Name" 
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange}
                                    name="createPaletteName"
                                    validators={["required", "isPaletteNameUnique"]}
                                    errorMessages={["Palette name is required", "Palette name is already taken"]}
                                />
                        
                                
                        
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSaveScreen} color="primary">
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" type="submit"> Save </Button>
                            
                        </DialogActions>
                    </ValidatorForm>    
                </Dialog>
            </div>
        );
}}

export default EmptyPaletteSave;