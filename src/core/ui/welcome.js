import React from "react";
import Modal from "./modal";

export default class Welcome extends React.Component{


    render() {
        return(
            <Modal title={"Welcome to Graph Explorer"} size={"lg"}>
                <p>A data visualiser for graphs and tables.  </p>
                <ul className={"vertical list"}>
                    <li>
                        <a onClick={()=> alert("not implemented yet.")}>1. Create sample data</a>
                    </li>
                      <li>
                        <a onClick={()=> alert("not implemented yet")}>2. Your first graph query</a>
                    </li>
                </ul>
            </Modal>
        )
    }
}