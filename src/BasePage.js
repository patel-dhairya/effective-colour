import React from "react";
import "./css/BasePage.css"

function BasePage({children}){
    return <section className="page">{children}</section>
}

export default BasePage;