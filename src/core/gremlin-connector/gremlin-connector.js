import React from "react";
import {
    UUIDGenerator,
    DefaultConnectionRetryTimeout,
    DefaultMaxTimeElapsedWarningInSeconds, GREMLIN_SERVER_URL
} from "../../config";
import {ConnectionStatusComponent} from "./index";
import Footer from "../ui/footer";

export default class GremlinConnectorComponent extends React.Component {

    /*
    Use this component when you need gremlin server connect and query feature.
    Usage:

            export default class ConsoleView extends GremlinConnectorComponent{

                componentDidMount() {
                    super.componentDidMount();
                }

                // to make query
                makeQuery(query);

                // to get the list of responses of the query
                processResponse(responses);

            }




     */


    ws = this.createWebSocket();

    createWebSocket() {
        return new WebSocket(this.props.gremlinUrl);
    }

    static defaultProps = {
        gremlinUrl: GREMLIN_SERVER_URL
    }
    responses = [];

    eventHandler = (eventData) => console.log("hello");

    constructor(props) {
        super(props);
        this.state = {
            reconnectingTimer: 0,
            queryElapsedTimeCounter: 0,
            isQuerying: false,
            isConnected2Gremlin: false,
            statusMessage: null
        }
    }

    connect() {
        this.setupWebSocket();
    }

    setIsConnected2Gremlin(status) {
        // this.props.eventHandler({isConnected2Gremlin: status});
        console.log("setIsConnected2Gremlin", status)
        this.setState({isConnected2Gremlin: status});
    }

    setIsStreaming(status) {
        // this.props.eventHandler({isStreaming: status});
        this.setState({isStreaming: status});
    }

    setIsQuerying(status) {
        this.setState({isQuerying: status})
        // this.props.eventHandler({isQuerying: status});
    }

    setQueryElapsedTimeCounter(count) {
        // this.props.eventHandler({queryElapsedTimeCounter: count});
        this.setState({queryElapsedTimeCounter: count});
    }

    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    flushResponsesData = () => this.responses = [];

    processResponse(responses) {
        console.log("Attention response handler is not set for this component :(. " +
            "This method will return responses list(list of responses to support stream of responses )" +
            " for the query.", responses);
    }

    updateTimer(timerCount, isMaxTimeElapsed) {
        this.setState({queryElapsedTimeCounter: timerCount, maxTimeElapsedError: isMaxTimeElapsed});
    }

    gatherDataFromStream(response) {
        console.log("onmessage received", response);
        if (response.status.code === 206) {
            this.setIsStreaming(true);
            this.setStatusMessage("Gathering data from the stream");
            this.responses.push(response);
        } else {
            this.setIsStreaming(false);
            this.responses.push(response);
            this.setStatusMessage("Responded to the Query Successfully");
            const responses = Object.assign(this.responses);
            this.flushResponsesData();
            this.setIsQuerying(false);
            this.processResponse(responses);
        }
    }

    // waitTillSocketConnect(){
    //     if (this.ws.readyState !== 1){
    //         setTimeout(function () {
    //
    //         })
    //     }
    // }

    setupWebSocket() {
        let _this = this;
        console.log("setupWebSocket triggered===========================")

        // while(this.ws.readyState !== 1){
        //
        // }
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            _this.setIsConnected2Gremlin(true);
        }

        this.ws.onmessage = event => {
            // listen to data sent from the websocket server
            const response = JSON.parse(event.data)
            console.log("onmessage", response);
            _this.gatherDataFromStream(response);
        }

        this.ws.onclose = () => {
            console.log('disConnected2Gremlin')
            // automatically try to reconnect on connection loss
            _this.setIsConnected2Gremlin(false);

            let i = 0;
            let timer = setInterval((function () {
                    i += 1;
                    _this.setStatusMessage("Connection Attempt Failed. Waited " + i + "s of " + (DefaultConnectionRetryTimeout) + "s 'retry in' time...");
                    if (i > DefaultConnectionRetryTimeout) {
                        clearInterval(timer);
                        _this.connect();
                    }
                }
            ), 1000); // retry in 5 seconds

        }
    }

    startTimer() {
        this.setQueryElapsedTimeCounter(0);
        let _this = this;
        let timer = setInterval((function () {
                console.log("Timer started xyx", _this.state.queryElapsedTimeCounter);
                if (_this.state.isQuerying === false) {
                    clearInterval(timer);
                }
                _this.updateTimer(_this.state.queryElapsedTimeCounter + 1, false);
                if (_this.state.queryElapsedTimeCounter >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.updateTimer(_this.state.queryElapsedTimeCounter + 1, true);
                }
            }
        ), 1000); // check every second.
    }

    generateQueryPayload(query) {
        return {
            "requestId": UUIDGenerator(),
            "op": "eval",
            "processor": "",
            "args": {
                "gremlin": query,
                "bindings": {},
                "language": "gremlin-groovy"
            }
        };
    }


    makeQuery(query) {
        let _this = this;
        console.log("queryGremlinServer :::  query", query);
        this.flushResponsesData();
        if (query) {
            this.startTimer();
            let msg = this.generateQueryPayload(query);
            let data = JSON.stringify(msg);
            console.log("Query long one", data);
            if (this.ws) {
                if (this.ws.readyState === 1) {
                    _this.ws.send(data, {mask: true});
                    _this.setIsQuerying(true);
                    _this.setStatusMessage("Sending Query..")
                } else {
                    _this.ws.onopen = function () {
                        _this.ws.send(data, {mask: true});
                        _this.setIsQuerying(true)
                        _this.setStatusMessage("Sending Query..")
                    };
                }
            }
        }
    }


    componentDidMount() {
        this.connect();
    }

    render() {
        return (
            <Footer>
                <ConnectionStatusComponent
                    statusMessage={this.state.statusMessage}
                    isConnected2Gremlin={this.state.isConnected2Gremlin}
                />
            </Footer>
        )

    }


}
