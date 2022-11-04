import React from "react";
import style from "./styles/CreatableColorBoxStyle";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

/* Function to create color box for users when using create palette */

const CreatableColorBox = SortableElement((props) => {
    const {classes, handleDelete, name, color} = props;
    return(
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>
                    {name}
                </span>

                {/* Allows to delete added color from palette */}
                <DeleteIcon className={classes.deleteIcon} onClick={handleDelete}/>
            </div>
        </div>
    );
});

export default withStyles(style)(CreatableColorBox);