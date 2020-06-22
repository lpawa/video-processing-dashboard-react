import React from 'react';
import {validateNumber} from "../Utils/validate-url";

class InputElement extends React.Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
    }

    checkValidity(input) {
        return (validateNumber(input) && input > 0);
    }

    handleInput(event) {
        let input = event.target.value;
        this.props.setInput(input, this.checkValidity(input));
    }

    render() {
        return (
            <div className={"inputElement"}>
                <span><label>{this.props.label}</label></span>
                <input
                    className={this.props.class}
                    type={"number"}
                    required
                    onChange={this.handleInput}
                    value={this.props.input || ""}
                />
            </div>
        );
    }
}

export default InputElement;
