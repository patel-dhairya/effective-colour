import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import CreatableColorBox from "./CreatableColorBox";

/* Allows to sort colors when creating palette */
const DragColorList = SortableContainer(({selectedColors, handleDeleteColor})=>{
    return(
        <div style={{height:"100%"}}>
            {selectedColors.map((color, index) => (
                  <CreatableColorBox 
                    index= {index}
                    key={color.name} 
                    color={color.color} 
                    name={color.name} 
                    handleDelete={()=> handleDeleteColor(color.name)}/>
                  ))}

        </div>
    );
});

export default DragColorList;