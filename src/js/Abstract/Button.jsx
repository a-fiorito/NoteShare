import React, { Component } from 'react';

export default class Button extends Component {

    constructor(props) {
        super(props);
    }

    isDisabled() {
        return this.props.isDisabled ? "disabled" : "";
    }

    render() {
        return (
            <div className={`button ${this.isDisabled()}`} onClick={this.props.func}>
                <span>{this.props.label}</span>
            </div>
        );
    }
}
