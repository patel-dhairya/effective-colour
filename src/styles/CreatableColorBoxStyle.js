import chroma from "chroma-js";

const style = {
    root: {
        height: "25%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg":{
            color: "white",
            transform: "scale(1.4)"
        }
    },

    boxContent: {
        position:"absolute",
        width:"100%",
        left:"0px",
        bottom:"0px",
        padding: "10px",
        color: props => 
            chroma(props.color).luminance()<=0.1? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justfiyContent: "space-between"
    },

    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
}

export default style;