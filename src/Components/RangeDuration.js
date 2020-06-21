import React from 'react';
import RangeElement from "./RangeElement";

class RangeDuration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ranges: [],
        };

        this.addStart = this.addStart.bind(this);
        this.addEnd = this.addEnd.bind(this);
        this.addRange = this.addRange.bind(this);
        this.deleteRange = this.deleteRange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
    }

    checkValidity() {
        let ranges = this.state.ranges;
        return ranges.reduce((acc, range) => {
            let start = parseInt(range.start);
            let end = parseInt(range.end);
            return (acc && start>=0 && end>=0 && end>=start);
        }, !!ranges.length);
    }

    addStart(index, event) {
        let input = event.target.value;
        let ranges = this.state.ranges;

        ranges[parseInt(index)].start = parseInt(input);

        this.setState({ranges}, this.updateParent);
    }

    addEnd(index, event) {
        let input = event.target.value;
        let ranges = this.state.ranges;

        ranges[parseInt(index)].end = parseInt(input);

        this.setState({ranges}, this.updateParent);
    }

    updateParent() {
        let ranges = this.state.ranges;
        this.props.setInput(ranges, this.checkValidity());
    }

    addRange() {
        let ranges = this.state.ranges;
        ranges.push({
            start: "",
            end: "",
        });
        this.setState({ranges});
    }

    deleteRange(index) {
        let ranges = this.state.ranges.filter((obj, i) => i !== index);
        this.setState({
            ranges
        }, this.updateParent);
    }

    render() {
        return (
            <React.Fragment>
                <button
                    onClick={this.addRange}
                    className={"add-range-duration"}
                >
                    Add Range Duration
                </button>
                {
                    this.state.ranges.length ?
                        this.state.ranges.map(
                            (range, index) =>
                                <RangeElement
                                    addEnd={this.addEnd}
                                    addStart={this.addStart}
                                    deleteRange={this.deleteRange}
                                    rangeDurationStartClass={"range-duration-start-"}
                                    rangeDurationEndClass={"range-duration-end-"}
                                    deleteRangeDurationClass={"delete-range-duration-"}
                                    range={range}
                                    index={index}
                                    key={"rd_" + index}
                                />
                        )
                        : null
                }
            </React.Fragment>
        );
    }
}

export default RangeDuration;
