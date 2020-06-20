import React from 'react';
import {validateUrl} from "../Utils/validate-url";

import IntervalDuration from "./IntervalDuration";
import RangeDuration from "./RangeDuration";
import OutputVideo from "./OutputVideo";
import NoOfSegments from "./NoOfSegments";

import SegmentVideoRepository from "../Repository/SegmentVideoRepository";

const INTERVAL_DURATION = 'Interval Duration';
const RANGE_DURATION = 'Range Duration';
const NO_OF_SEGMENTS = 'Number of Segments';
const SEGMENT_TYPES = [INTERVAL_DURATION, RANGE_DURATION, NO_OF_SEGMENTS];

class SegmentVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: INTERVAL_DURATION,
            videoLink: "",
            input: null,
            isValidURL: false,
            isValidInput: false,
            segmentedVideos: [],
        }
        this.setInput = this.setInput.bind(this);
        this.segmentVideo = this.segmentVideo.bind(this);
        this.handleVideoLinkChange = this.handleVideoLinkChange.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
    }

    handleVideoLinkChange(event) {
        let link = event.target.value;
        this.setState({
            videoLink: link,
            isValidURL: validateUrl(link),
        })
    }

    handleSettingsChange(event) {
        this.setState({
            setting: event.target.value,
            input: null,
            isValidInput: false,
        })
    }

    segmentVideo(event) {
        let request = function () {
        };
        let req_obj = {
            "video_link": this.state.videoLink,
        }

        let segmentVideoRepo = new SegmentVideoRepository();

        switch (this.state.setting) {
            case INTERVAL_DURATION:
                request = segmentVideoRepo.processInterval;
                req_obj['interval_duration'] = parseInt(this.state.input);
                break;
            case RANGE_DURATION:
                request = segmentVideoRepo.processRange;
                req_obj['interval_range'] = this.state.input;
                break;
            case NO_OF_SEGMENTS:
                request = segmentVideoRepo.processSegments;
                req_obj['no_of_segments'] = parseInt(this.state.input);
                break;
            default:
                break;
        }

        if (request) {
            request.call(segmentVideoRepo, req_obj).then((data) => {
                if (data['interval_videos']) {
                    this.setState({
                        segmentedVideos: data['interval_videos']
                    })
                }
            }).catch((e) => {
                console.log(e);
            })
        }

    }

    setInput(input, isValidInput) {
        this.setState({
            input: input,
            isValidInput: isValidInput
        })
    }

    render() {
        return (
            <div>
                <h1 className={"heading"}>Segment Video</h1>
                <hr/>
                <div className={"elements"}>
                    <div className={"inputElement"}>
                        <span><label>Video Link...</label></span>
                        <input
                            className={"video-link"}
                            name={"video-link"}
                            type={"url"}
                            required
                            onChange={this.handleVideoLinkChange}
                            value={this.state.videoLink}
                        />
                    </div>
                    <div className={"inputElement"}>
                        <span><label>Select Segment Settings...</label></span>
                        <select
                            required
                            value={this.state.setting}
                            name={"setting"}
                            onChange={this.handleSettingsChange}
                            className={"segment-setting"}
                        >
                            {
                                SEGMENT_TYPES.map(
                                    (type, index) => <option key={"st-" + index} value={type}>{type}</option>
                                )
                            }
                        </select>
                    </div>
                    {
                        this.state.setting === INTERVAL_DURATION ?
                            <IntervalDuration
                                setInput={this.setInput}
                                input={this.state.input}
                            /> : this.state.setting === RANGE_DURATION ?
                            <RangeDuration
                                setInput={this.setInput}
                                input={this.state.input}
                            /> :
                            this.state.setting === NO_OF_SEGMENTS ?
                                <NoOfSegments
                                    setInput={this.setInput}
                                    input={this.state.input}
                                /> :
                                null
                    }
                    <div>
                        {
                            <button
                                onClick={this.segmentVideo}
                                className={"process-video"}
                                disabled={!(this.state.isValidURL && this.state.isValidInput)}
                            >
                                Segment Video
                            </button>
                        }
                    </div>
                </div>
                <div className={"segmentedVideo"}>
                    {
                        this.state.segmentedVideos.length ?
                            <OutputVideo
                                videos={this.state.segmentedVideos}
                                className={"segmented-video-"}
                            />
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default SegmentVideo;
