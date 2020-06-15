import React from "react";
import LeftNav from "../core/ui/nav/left";
import MainTopNav from "../core/ui/nav/top";
import MainContent from "../core/ui/main-content";
import JSONCanvas from "../core/ui/canvas/json";
import GremlinConnectorComponent from "../core/gremlin-connector";

export default class HomeView extends GremlinConnectorComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    onQuerySubmit(query) {
        console.log("Query is " + query);
        // make query to gremlin here
        this.makeQuery(query);
    }

    processResponse(responses) {
        this.setState({
            data: JSON.stringify(responses, null, 4)
        })
    }

    render() {

        const parentHTML = super.render();
        return (
            <div>
                <LeftNav/>
                <MainTopNav onQuerySubmit={this.onQuerySubmit.bind(this)}/>
                <MainContent>
                    <JSONCanvas data={this.state.data}/>
                </MainContent>
                {parentHTML}
            </div>
        )
    }
}
