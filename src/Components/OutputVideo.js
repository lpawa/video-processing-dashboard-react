import React from 'react';

class Video extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <video className={this.props.className} controls width="300">
                <source
                    src={this.props.video.video_url}
                    className={this.props.sourceName}
                    type="video/mp4"
                />
            </video>
        );
    }
}

class OutputVideo extends React.Component {
    render() {
        let videos = this.props.videos;
        if(Array.isArray(videos)) {
            return (
                <div className={"video-container"}>
                    {
                        this.props.videos.map(
                            (video, index) =>
                                <Video
                                    video={video}
                                    className={this.props.className + (index + 1)}
                                    sourceName={this.props.className + "source-" + (index + 1)}
                                    key={"video_" + index}
                                />
                        )
                    }
                </div>
            );
        } else {
            return (
                <Video
                    video={videos}
                    className={this.props.className}
                    sourceName={this.props.className+"-source"}
                />
            );
        }
    }
}

export default OutputVideo;
