import React from "react";
import ReactJson from 'react-json-view'
import "./json.scss";

export default class JSONCanvas extends React.Component {

    static defaultProps = {
        data: null
    }

    render() {
        return (
            <div className={"jsonView"}>

                <ReactJson theme="monokai" style={{"backgroundColor": "transparent"}} src={this.props.data}/>

            </div>
        )
    }
}
