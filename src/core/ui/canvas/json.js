import React from "react";


export default class JSONCanvas extends React.Component {

    static defaultProps = {
        data: null
    }

    render() {
        return (
            <div className={"jsonView"}>
                <h1>JSON view here</h1>
                <hr/>
                {this.props.data}
            </div>
        )
    }
}
