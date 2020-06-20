import React from 'react';

class RangeElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.index;
        const val = index + 1
        let range = this.props.range;
        let start = range.start;
        start = isNaN(start) ? "" : start;
        let end = range.end;
        end = isNaN(end) ? "" : end;
        let url = range.video_url || "";

        return (
            <div className={"range-elements"}>
                {
                    this.props.includeVideoUrl ?
                        <div>
                            <span>
                                <label>Video Link...</label></span>
                            <input
                                className={this.props.videoUrlClass + val}
                                type={"url"}
                                required
                                onChange={this.props.handleVideoLinkChange.bind(this, index)}
                                value={url}
                            /></div> : null
                }
                <div>
                    <span><label>Range Duration Start</label></span>
                    <input
                        className={this.props.rangeDurationStartClass + val}
                        type={"number"}
                        required
                        onChange={this.props.addStart.bind(this, index)}
                        value={start}
                    />
                </div>
                <div>
                    <span><label>Range Duration End</label></span>
                    <input
                        className={this.props.rangeDurationEndClass + val}
                        type={"number"}
                        required
                        onChange={this.props.addEnd.bind(this, index)}
                        value={end}
                    />
                </div>
                <div>
                    <button
                        onClick={this.props.deleteRange.bind(this, index)}
                        className={this.props.deleteRangeDurationClass + val}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default RangeElement;
