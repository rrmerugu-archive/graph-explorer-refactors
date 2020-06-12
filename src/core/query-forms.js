import React from "react";

export default class QueryInputForm extends React.Component{


    static defaultProps = {
        queryOnSubmitHandler : () => console.log("No Query Handler added yet"),
        defaultQueryValue: null,
        defaultPlaceholderText: "g.V().toList();"
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.queryOnSubmitHandler(e.target.query.value);
    }

    render() {
        return (
            <div className={"queryInputForm"}>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input name={"query"} type="text" placeholder={this.props.defaultPlaceholderText}
                           defaultValue={this.props.defaultQueryValue}/>
                </form>
            </div>
        );
    }
}

export  class QueryTextAreaForm extends React.Component{

    defaultProps = {
        queryOnSubmitHandler : () => console.log("No Query Handler added yet"),
        defaultQueryValue: null
    }

    render() {
        return (
            <div className={"queryInputForm"}>
                <form onSubmit={this.props.queryOnSubmitHandler}>
                    <textarea>{this.props.defaultQueryValue}</textarea>
                </form>
            </div>
        );
    }
}