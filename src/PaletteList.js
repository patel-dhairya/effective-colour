import React, {Component} from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { CSSTransition,TransitionGroup } from "react-transition-group";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from "@material-ui/core/List";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { blue, red } from "@material-ui/core/colors";

import MiniPalette from "./MiniPalette";
import style from "./styles/PaletteListStyle";



/* Home page or Root page which shows current available color palletes as mini palettes */


class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteDialogConfirmation: false  ,
            deleteId: ""
        }
        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPaletteBox = this.goToPaletteBox.bind(this);
    }

    openDeleteDialog(id){
        this.setState({deleteDialogConfirmation: true, deleteId: id})
    }

    closeDeleteDialog(){
        this.setState({deleteDialogConfirmation: false, deleteId: ""})
    }

    /* This function links palette on homescreen to their bigger version */
    goToPaletteBox(id){
        this.props.history.push(`/palette/${id}`)
    }

    /* This function handles deleting palette from palette list */
    handleDelete(){
        this.props.deletePalette(this.state.deleteId)
        this.closeDeleteDialog();
    }

    render(){
        const {palettes, classes} = this.props;
        const {deleteDialogConfirmation} = this.state
        return(
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.navigation}>
                    <h1 className={classes.heading}> React colors </h1>
                    <Link to="/palette/new"> Create a new Palette! </Link>
                </nav>
                    <TransitionGroup className={classes.palettes}>
                        {/* take user to their requiered pallete */}
                        
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames='fade' timeout={400}>
                                <MiniPalette 
                                    {...palette} 
                                    onPaletteClick = {this.goToPaletteBox}
                                    openDeleteDialog = {this.openDeleteDialog}
                                    key = {palette.id}
                                    id = {palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
            </div>

            {/* Dialog which handles Delete palette confirmation window */}
            <Dialog 
                open={deleteDialogConfirmation} 
                aria-labelledby="delete-dialog-confirmation" 
                onClose={this.closeDeleteDialog}
            >
                <DialogTitle id="delete-dialog-confirmation"> Are you sure? </DialogTitle>
                <List>
                    <ListItem button onClick={this.handleDelete}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: blue[100], color: blue[400]}}>    
                                <CheckIcon/>    
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Yes"/>
                    </ListItem>

                    <ListItem button onClick={this.closeDeleteDialog}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: red[100], color: red[400]}}>    
                                <CloseIcon/>    
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="No"/>
                    </ListItem>

                </List>
            </Dialog>
        </div>
        );
    }
}

export default withStyles(style)(PaletteList);