import React from "react";

export default class QueryInputForm extends React.Component{


    defaultProps = {
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
                <form action="" onSubmit={this.props.onFormSubmit}>
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
                <form action="" onSubmit={this.props.queryOnSubmitHandler}>
                    <textarea>{this.props.defaultQueryValue}</textarea>
                </form>
            </div>
        );
    }
}