import chroma from "chroma-js";


const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

/* Function generatePaletter takes palette of colors and return new palette which contains light to dark shade of each color of
    original palette. */
function generateNewPalette(initialPalette){
    let tempPalette = {
        paletteName: initialPalette.paletteName,
        id: initialPalette.id,
        emoji: initialPalette.emoji,
        colors: {}
    }
    for (let shade of shades){
        tempPalette.colors[shade] = [];
    }
    for (let color of initialPalette.colors){
        let scale= generateShade(color.color, 10).reverse();
        for (let s in scale){
            tempPalette.colors[shades[s]].push({
                name: `${color.name} ${shades[s]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[s],
                rgb: chroma(scale[s]).css(),
                rgba: chroma(scale[s])
                    .css()
                    .replace("rgb", "rgba")
                    .replace(")", ",1.0)")
            });
        }
    }
    return tempPalette;
    
}

/* Returns array of dark to light shade/hue colors for given hexValue with helper functions getRange
*/
function generateShade(hexValue, totalColors){
    /* A color scale, created with chroma.scale, is a function that maps numeric values to a color palette. 
    The default scale has the domain 0..1 and goes from white to black. */
    return chroma.scale(getRange(hexValue)).mode("lab").colors(totalColors);
}

/* Returns range of colors for chroma.scale function */
function getRange(hexValue){
    const finish = "#fff";
    return [
        chroma(hexValue)
        .darken(1.1)
        .hex(),
        hexValue,
        finish
    ];
}

export { generateNewPalette };