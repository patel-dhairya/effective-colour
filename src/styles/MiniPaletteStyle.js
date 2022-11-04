const style = {
    root:{
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover svg": {
            opacity: 1
        }
    },  
    colors:{
        backgroundColor: "#acf",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1 rem",
        position: "relative",
        margin: "0"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },

    miniColors: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    },

    deleteIcon: {
      color: "whitesmoke",
      backgroundColor: "#eb3da9",
      width: "20px",
      height: "20px",
      position: "absolute",
      right: "0px",
      top: "0px",
      padding: "8px",
      zIndex: 2,
      opacity: 0,
      transition: "all 0.45s ease-in-out"
    }
};

export default style;