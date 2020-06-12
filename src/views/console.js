import GremlinConnectorComponent, {ConnectionStatusComponent} from "../core/gremlin-connector";
import React from "react";
import QueryInputForm from "../core/query-forms";
import JSONViewComponent from "../core/json-view";
export default class ConsoleView extends GremlinConnectorComponent{

    constructor(props) {
        super(props);
        this.state = {
            data : null
        }
    }

    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        setTimeout(function(){
            _this.makeQuery("g.V().toList()");
        }, 200);
    }

    processResponse(responses) {
        this.setState({
            data: JSON.stringify(responses, null, 4)
        })
    }

    submitQuery(query){
        this.makeQuery(query);
    }

    render() {
        return (
            <div className={"consoleView"}>
                <QueryInputForm queryOnSubmitHandler={this.submitQuery.bind(this)} />
                <ConnectionStatusComponent
                    statusMessage={this.state.statusMessage}
                    isConnected2Gremlin={this.state.isConnected2Gremlin}
                />
                <JSONViewComponent data={this.state.data} />
                {this.state.isQuerying}
            </div>
        )
    }
}