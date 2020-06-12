import React from "react";


export default class JSONViewComponent extends React.Component {

    static defaultProps = {
        data: null
    }

    render() {
        return (
            <div className={"jsonView"}>
                {this.props.data}
            </div>
        )
    }
}