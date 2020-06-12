import GremlinConnectorComponent, {ConnectionStatusComponent} from "../core/gremlin-connector";
import React from "react";

export default class ConsoleView extends GremlinConnectorComponent{



    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        setTimeout(function(){
            _this.makeQuery("g.V().toList()");
        }, 200);
    }

    render() {
        return (
            <div className={"consoleView"}>
                <ConnectionStatusComponent
                    statusMessage={this.state.statusMessage}
                    isConnected2Gremlin={this.state.isConnected2Gremlin}
                />
                {this.state.isQuerying}
            </div>
        )
    }
}