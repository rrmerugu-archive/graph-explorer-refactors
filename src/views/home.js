import React from "react";
import LeftNav from "../core/ui/nav/left";
import MainTopNav from "../core/ui/nav/top";

export default class HomeView extends React.Component {

    render() {
        return (
            <div>

                <LeftNav/>
                <MainTopNav />

            </div>
        )
    }
}
