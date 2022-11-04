import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"; 

import Palette from "./Palette";
import colorCollection from "./colorCollection";
import { generateNewPalette } from "./colorModifier";
import PaletteList from "./PaletteList";
import ColorShades from "./ColorShades";
import EmptyPalette from "./EmptyPalette";
import BasePage from "./BasePage";

class App extends Component {
  constructor(props){
    super(props);
    const loadLocalPalettes = JSON.parse(window.localStorage.getItem("localPalettes"));
    this.state = {palettes: loadLocalPalettes || colorCollection};
    this.saveColorPalette = this.saveColorPalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  /* Remove Palette of given ID from list */
  deletePalette(id){
    this.setState(
      s => ({palettes: s.palettes.filter(palette=> palette.id!==id)}),
      this.saveToLocalStorage
    );
  }

  /* Save the current user created palette to palette collections */
  saveColorPalette(newPalette){
    this.setState({palettes: [...this.state.palettes, newPalette]},
    this.saveToLocalStorage
    ); 
  }

  /* Save current palette list to local storage */
  saveToLocalStorage(){
    window.localStorage.setItem("localPalettes", JSON.stringify(this.state.palettes))
  }

  render() {
    return (
      <Route
        render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={400}>
            <Switch location={location}>

              {/* Allow user to create new empty palette to add custom colors */}
              <Route exact path="/palette/new" 
                render={(routeProps) =>(
                  <BasePage>
                    <EmptyPalette 
                      saveColorPalette={this.saveColorPalette} 
                      palettes= {this.state.palettes}
                      {...routeProps}
                      />
                  </BasePage>
                )}
              />
                      
            
              {/* Route to open any palette by clicking on it on home screen */}
              <Route
                exact
                path='/palette/:id'
                render={routeProps => (
                  <BasePage>
                    <Palette
                      palette={generateNewPalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </BasePage>
                )}
              />

              {/* Root page or Home page which shows all stored color palettes */}
              <Route exact path='/' render={(routeProps) => (
                <BasePage>
                  <PaletteList 
                    palettes = {this.state.palettes} 
                    deletePalette={this.deletePalette}
                    {...routeProps}
                    />
                    </BasePage>
                )} 
              />
              



            {/* Route for different shades of same color which can be obtained by clicking on that color in palette */}
              <Route exact path='/palette/:id/:shadeId'
                render={routeProps => (
                  <BasePage>
                    <ColorShades colorId={routeProps.match.params.shadeId}
                      palette={generateNewPalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </BasePage>
                )}
              />
              
              {/* Backup Route to home if user tries to access anything else */}
              <Route render={(routeProps) => (
                <BasePage>
                  <PaletteList 
                    palettes = {this.state.palettes} 
                    deletePalette={this.deletePalette}
                    {...routeProps}
                    />
                    </BasePage>
                )} 
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        )}
      />
    )
  }
}

export default App;