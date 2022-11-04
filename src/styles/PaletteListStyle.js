import bg from "./subtle-prism.svg"

const style = {
    "@global":{
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 400ms ease-out"
        }
    },

    root: {
        backgroundColor: "#42FF11",
        backgroundImage: `url(${bg})`,
        /* Background by SVGBackgrounds.com */
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll'
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    navigation: {
        width: "100%",
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        color: "black",
        "& a": {
            color: "smokewhite",
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    },
    heading: {
        fontSize: "2rem"
    }
}

export default style;