import React from "react";
import {
    faHome,
    faTerminal,
    faCog,
    faQuestionCircle,
    faBug,
    faHistory,
    faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./left.scss";


export default class LeftNav extends React.Component {


    render() {

        return (
            <div id="mainNavigation" className={"leftNav"}>
                <ul className={"vertical"}>
                    <li>
                        <a href="/" title={"Graph Visualiser"}>
                            <FontAwesomeIcon icon={faHome}/>
                        </a>
                    </li>
                    <li>
                        <a href="/console" title={"Query Console"}>
                            <FontAwesomeIcon icon={faTerminal}/>
                        </a>
                    </li>
                    <li>
                        <a href="/history" title={"History"}>

                            <FontAwesomeIcon icon={faHistory}/>
                        </a>
                    </li>
                    <li>
                        <a href="/management" title={"Management"}>
                            <FontAwesomeIcon icon={faCog}/>
                        </a>
                    </li>
                </ul>
                <ul className={"bottom vertical"}>
                    <li>
                        <a href="/about" title={"Support/Documentation"}>

                            <FontAwesomeIcon icon={faQuestionCircle}/>

                        </a>
                    </li>
                    <li>
                        <a
                            target={"_new"} title={"Support / Report Issues"}
                            href="https://github.com/invanalabs/graph-explorer/issues">

                            <FontAwesomeIcon icon={faBug}/>

                        </a>
                    </li>
                    <li>
                        <a href={"/switch-server"} title={"Switch Server"}>

                            <FontAwesomeIcon icon={faSignInAlt}/>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

