import React from "react";
import {CONNECT_URL, UUIDGenerator, DefaultMaxTimeElapsedWarningInSeconds} from "../config";

export default class GremlinConnector extends React.Component {

    VALID_EVENT_KEYS = [
        "isConnected",
        "isStreaming"
    ];

    responses = [];
    static  defaultProps = {
        gremlinUrl: null,
        responseHandler: null, // used to send the response back to the parent component.
        eventHandler: null // used to send events  back to the parents component to track the progress.
    }

    constructor(props) {
        super(props);
        //
    }

    connect() {
        this.ws = WebSocket(this.props.gremlinUrl);
        this.setupWebSocket();
    }


    setConnected2Gremlin(status) {
        this.props.eventHandler({"isConnected": status});
    }

    setStreaming(status) {
        this.props.eventHandler({"isStreaming": status});
    }

    sendResponseBack() {
        this.props.eventHandler();
        this.responses = [];
    }


    processResponse(response) {
        console.log("onmessage received", response);
        if (response.status.code !== 206) {
            this.setStreaming(true);
            this.responses.push(response);
        } else {
            this.setStreaming(false);
            this.responses.push(response);
            this.sendResponseBack();
        }
    }

    setupWebSocket() {
        let _this = this;
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            _this.setConnected2Gremlin(true)
        }

        this.ws.onmessage = event => {
            // listen to data sent from the websocket server
            const response = JSON.parse(event.data)
            console.log("onmessage", response);
            _this.processResponse(response);
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
        }
    }
    startTimer() {

        let _this = this;
        let timer = setInterval((function () {
                console.log("Timer started xyx", _this.state.loadTimeCounter);
                if (_this.state.showLoading === false) {
                    clearInterval(timer);
                }
                _this.setState({loadTimeCounter: _this.state.loadTimeCounter + 1, maxTimeElapsedError: false});
                if (_this.state.loadTimeCounter >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.setState({loadTimeCounter: _this.state.loadTimeCounter + 1, maxTimeElapsedError: true});

                }
            }
        ), 1000); // retry in 5 seconds

    }
    makeQuery(query, freshQuery) {

        let _this = this;
        if (typeof freshQuery === "undefined") {
            freshQuery = false;
        }

        this.nodes = [];
        this.links = [];

        console.log("queryGremlinServer ::: freshQuery, query", freshQuery, query);


        if (query) {
            this.setState({
                gremlinQuery: query,
                loadTimeCounter: 0,
                showLoading: true
            })

            this.startTimer();

            let msg = {
                "requestId": UUIDGenerator(),
                "op": "eval",
                "processor": "",
                "args": {
                    "gremlin": query,
                    "bindings": {},
                    "language": "gremlin-groovy"
                }
            };


            let data = JSON.stringify(msg);
            console.log("Query long one", data);
            if (this.ws) {
                _this.setState({
                    "freshQuery": freshQuery
                })

                if (this.ws.readyState === 1) {
                    _this.ws.send(data, {mask: true});
                    _this.updateStatusMessage("Sending a Query");
                } else {
                    _this.ws.onopen = function () {
                        _this.ws.send(data, {mask: true});
                        _this.updateStatusMessage("Sending a Query")
                    };
                }

                if (freshQuery === true) {
                    this.addQueryToUrl(query);
                    this.updateQueryInput(query);
                }
                _this.setState({
                    "freshQuery": freshQuery
                })
            }


        }


    }


    componentDidMount() {
        this.connect();
    }


    // render() {
    //     <ChildComponent websocket={this.ws}/>
    // }

}