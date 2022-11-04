import React from "react";

/* Footer which shows name and emoji accosiated with current palette */
function FooterBar(props){
    const {paletteName, emoji} = props;
    return(
        <footer className='Palette-footer'>
          {paletteName}
          <span className='emoji'>{emoji}</span>
        </footer>

    ) 
}

export default FooterBar;