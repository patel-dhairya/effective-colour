import React, {Component} from "react";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from "@material-ui/core/Button";
import { arrayMove } from "react-sortable-hoc";

import DragColorList from "./DragColorList";
import EmptyPaletteNavigationBar from "./EmptyPaletteNavigationBar";
import EmptyPaletteColorPicker from "./EmptyPaletteColorPicker";
import style from "./styles/EmptyPaletteStyle";
import colorCollection from "./colorCollection";

/* Class to create a new empty/blank palette for user to fill it with custom colors. */
/* Template follows Persistent drawer code of material ui guide. */
/* Uses componenets from  - EmptyPaletteColorPicker, EmptyPaletteNavigationBar and EmptyPaletteSave */

class EmptyPalette extends Component{
  
      static defaultProps = {maxColors:20};
      constructor(props){
        super(props);
        this.state = {
          open: true,
          selectedColors: colorCollection[0].colors
        }
        this.addColor = this.addColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveColorPaletteSubmit = this.saveColorPaletteSubmit.bind(this);
        this.handleDeleteColor = this.handleDeleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
      }  

      

      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      /* Reset palette to 0 colors */
      clearPalette(){
        this.setState({selectedColors: []});
      }

      

      /* Add color to palette list */
      addColor(newSelectedColor){
        this.setState({selectedColors: [...this.state.selectedColors, newSelectedColor],  createColorName:""});
      }

      /* Add unique random color to palette */
      addRandomColor(){
        let randomColorAlreadyInPalette = true;
        let randomColorIndex;
        let selectedRandomColor;
        const colorPool = this.props.palettes.map(pal => pal.colors).flat();
        while (randomColorAlreadyInPalette){
          randomColorIndex = Math.floor(Math.random()*colorPool.length);
          selectedRandomColor = colorPool[randomColorIndex];
          randomColorAlreadyInPalette = this.state.selectedColors.some(
             // eslint-disable-next-line
            color => color.name === selectedRandomColor.name
          );
        }
        this.setState({selectedColors: [...this.state.selectedColors, selectedRandomColor]});

      }

      /* Helper function to name the color */
    handleChange(event){
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    
      /* Function to save color palette */
      saveColorPaletteSubmit(newPal){
        newPal.id = newPal.paletteName.toLowerCase().replace(/ /g , "-")
        newPal.colors = this.state.selectedColors
        this.props.saveColorPalette(newPal)
        this.props.history.push("/");
      }

      /* Remove color from palette when user click on delete icon on that color */
      handleDeleteColor(colorName){
        this.setState({
          selectedColors : this.state.selectedColors.filter(color=> color.name!==colorName)
        });
      }

      /* Save the new list after sorting */
      onSortEnd =  ({oldIndex, newIndex} ) => {
        this.setState(({selectedColors}) => ({
          selectedColors: arrayMove(selectedColors, oldIndex, newIndex),
        }));
      };

      render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, selectedColors } = this.state;
        const isPaletteFull = selectedColors.length >= maxColors;
    
        return (
          <div className={classes.root}>
          <EmptyPaletteNavigationBar 
            open={open}
            palettes={palettes} 
            saveColorPaletteSubmit = {this.saveColorPaletteSubmit}
            handleDrawerOpen = {this.handleDrawerOpen}
            />
            
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              
              <div className={classes.drawerContainer}>
              <Typography variant="h4" gutterBottom> Create your Palette </Typography>

              <div className={classes.drawerButtons}>
                  {/* Button for user to clear palette */}
                <Button 
                  className={classes.drawerbutton}
                  vairant="outlined" 
                  color="secondary" 
                  onClick={this.clearPalette}
                > 
                Clear 
                </Button>

                {/* Button for selecting random color */}
                <Button 
                  className={classes.drawerbutton}
                  vairant="outlined" 
                  color="primary" 
                  onClick={this.addRandomColor}
                  disabled={isPaletteFull}>
                Random 
                </Button>
                
                </div>

                {/* Color Picker to add color */}
                <EmptyPaletteColorPicker
                  isPaletteFull = {isPaletteFull}
                  addColor = {this.addColor}
                  selectedColors = {selectedColors}
                />

              </div>
              </Drawer>
              

              <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
              >
              <div className={classes.drawerHeader}/>

                {/* Create sortable list for colors in palette
                  Also allows to remove color from palette list*/}
                <DragColorList 
                  selectedColors={this.state.selectedColors} 
                  handleDeleteColor={this.handleDeleteColor}
                  axis="xy"
                  onSortEnd={this.onSortEnd}
                />
  
              </main>
          </div>
        );
      }
}

export default withStyles(style, { withTheme: true })(EmptyPalette);