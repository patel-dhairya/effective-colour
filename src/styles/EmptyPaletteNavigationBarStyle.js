
const drawerWidth = 350;
const style = theme => ({
    root: {
        display: "flex"
    },
    hide: {
      display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px",
        alignItems: "center"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20,
      },
      barButtons: {
        marginRight: "1rem"
      },
      barButton: {
        margin: "0 0.5rem"
      }
})

export default style;