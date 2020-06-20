import React from 'react';
import {validateNumber} from "../Utils/validate-url";

class NoOfSegments extends React.Component {
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
                <span><label>Numner of Segments...</label></span>
                <input
                    className={"num-segments"}
                    type={"number"}
                    required
                    onChange={this.handleInput}
                    value={this.props.input || ""}
                />
            </div>
        )
    }
}

export default NoOfSegments;
