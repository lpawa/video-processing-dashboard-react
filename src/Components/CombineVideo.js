import React from 'react';
import RangeElement from "./RangeElement";
import {validateUrl} from "../Utils/validate-url";
import SegmentVideoRepository from "../Repository/SegmentVideoRepository";
import OutputVideo from "./OutputVideo";

class CombineVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ranges: [],
            isValid: false,
            outputVideo: null,
        };

        this.addStart = this.addStart.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addEnd = this.addEnd.bind(this);
        this.addRange = this.addRange.bind(this);
        this.deleteRange = this.deleteRange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
        this.handleVideoLinkChange = this.handleVideoLinkChange.bind(this);
        this.combineVideos = this.combineVideos.bind(this);
    }

    checkValidity(ranges) {
        return ranges.reduce((acc, range) => {
            let start = parseInt(range.start);
            let end = parseInt(range.end);
            let url = range.video_url;
            return (acc && start >= 0 && end >= 0 && end >= start && url && validateUrl(url));
        }, !!ranges.length);
    }

    addStart(index, event) {
        let input = event.target.value;
        let ranges = this.state.ranges;

        ranges[parseInt(index)].start = parseInt(input);

        this.setState({
            ranges,
            isValid: this.checkValidity(ranges),
        });
    }

    addEnd(index, event) {
        let input = event.target.value;
        let ranges = this.state.ranges;

        ranges[parseInt(index)].end = parseInt(input);

        this.setState({
            ranges,
            isValid: this.checkValidity(ranges),
        });
    }

    addRange() {
        let ranges = this.state.ranges;
        ranges.push({
            start: "",
            end: "",
            video_url: ""
        });
        this.setState({
            ranges,
        });
    }

    deleteRange(index) {
        let ranges = this.state.ranges.filter((obj, i) => i !== index);
        this.setState({
            ranges,
            isValid: this.checkValidity(ranges),
        });
    }

    handleVideoLinkChange(index, event) {
        let input = event.target.value;
        let ranges = this.state.ranges;
        ranges[parseInt(index)].video_url = input;

        this.setState({
            ranges,
            isValid: this.checkValidity(ranges),
        })
    }

    handleInput(event) {
        let state = {};
        state[event.target.name] = parseInt(event.target.value);
        this.setState(state);
    }

    combineVideos() {
        let segmentVideoRepo = new SegmentVideoRepository();
        let data = {
            "segments": this.state.ranges,
            "width": this.state.width,
            "height": this.state.height,
        };
        segmentVideoRepo.combineVideo(data).then((result) => {
            if (result['video_url']) {
                this.setState({
                    outputVideo: result
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (
            <div>
                <h1 className={"heading"}>Combine Video</h1>
                <hr/>
                <div className={"elements"}>
                    <div className={"buttonWrapper"}>
                        <button
                            onClick={this.addRange}
                            className={"add-video"}
                        >
                            Add Video
                        </button>
                    </div>
                    {
                        this.state.ranges.length ?
                            this.state.ranges.map(
                                (range, index) =>
                                    <RangeElement
                                        addEnd={this.addEnd}
                                        addStart={this.addStart}
                                        deleteRange={this.deleteRange}
                                        handleVideoLinkChange={this.handleVideoLinkChange}
                                        includeVideoUrl
                                        videoUrlClass={"combine-video-"}
                                        rangeDurationStartClass={"combine-video-range-duration-start-"}
                                        rangeDurationEndClass={"combine-video-range-duration-end-"}
                                        deleteRangeDurationClass={"delete-combine-video-range-duration-"}
                                        range={range}
                                        index={index}
                                        key={"rd_" + index}
                                    />
                            )
                            : null
                    }
                    <div className={"range-elements"}>
                        <div className={"inputElement"}>
                            <span><label>Video Height...</label></span>
                            <input
                                className={"video-height"}
                                name={"height"}
                                type={"number"}
                                required
                                onChange={this.handleInput}
                                value={this.state.height || ""}
                            />
                        </div>
                        <div className={"inputElement"}>
                            <span><label>Video Width...</label></span>
                            <input
                                className={"video-width"}
                                type={"number"}
                                name={"width"}
                                required
                                onChange={this.handleInput}
                                value={this.state.width || ""}
                            />
                        </div>
                    </div>
                    <div className={"buttonWrapper"}>
                        <button
                            onClick={this.combineVideos}
                            className={"combine-video"}
                            disabled={!(this.state.isValid && this.state.height > 0 && this.state.width > 0)}
                        >
                            Combine Video(s)
                        </button>
                    </div>
                </div>
                {
                    this.state.outputVideo ?
                        <OutputVideo
                            videos={this.state.outputVideo}
                            className={"combined-video"}
                        />
                        : null
                }

            </div>
        );
    }
}

export default CombineVideo;
