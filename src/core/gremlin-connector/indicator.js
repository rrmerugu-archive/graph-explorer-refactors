import React from "react";
import "./indicator.scss";

export default class ConnectionIndicatorComponent extends React.Component{

    static defaultProps = {
        isConnected2Gremlin: null
    }

    render() {
        return (
            <span>
                {
                    (this.props.isConnected2Gremlin === true)
                        ? <span className={"connected ConnectionIndicatorComponent"}></span>
                        : <span className={"notConnected ConnectionIndicatorComponent"}></span>
                }
            </span>
        )
    }
}
