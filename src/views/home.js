import React from "react";
import LeftNav from "../core/ui/nav/left";
import MainTopNav from "../core/ui/nav/top";

export default class HomeView extends React.Component {

    onQuerySubmit(query) {
        alert("Query is " + query);
    }

    render() {
        return (
            <div>

                <LeftNav/>
                <MainTopNav onQuerySubmit={this.onQuerySubmit.bind(this)}/>

            </div>
        )
    }
}
