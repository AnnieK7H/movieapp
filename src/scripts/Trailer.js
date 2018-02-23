import React, {Component} from 'react';

class Trailer extends Component {
    render() {
        let movieTrailer = {key: 1};
        if(this.props.movieTrailer !=null) {
            movieTrailer = this.props.movieTrailer;
        }
        
        const videoSrc = "https://www.youtube.com/embed/"+movieTrailer.key;
        
        return (
            movieTrailer.key !==1 ?
            <div>
                <iframe width="100%" height="315" src={videoSrc} frameBorder="0" allowFullScreen></iframe>
            </div>
            : <div></div>
        )
    }
}

export default Trailer;