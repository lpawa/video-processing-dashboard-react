import React from 'react';
import {validateNumber} from "../Utils/validate-url";

class IntervalDuration extends React.Component {
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
        this.props.setInput(input, this.checkValidity(input))
    }

    render() {
        return (
            <div className={"inputElement"}>
                <span><label>Interval Duration (in seconds)...</label></span>
                <input
                    className={"interval-duration"}
                    type={"number"}
                    required
                    onChange={this.handleInput}
                    value={this.props.input || ""}
                />
            </div>
        )
    }
}

export default IntervalDuration;
