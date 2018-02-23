import React, {Component} from 'react';
import SubMovie from './SubMovie';

class SimilarMovies extends Component {

    render() {
        let otherMovies = this.props.otherMovies;

        return (
            <div>
                {
                    otherMovies.map((movie, i) => {
                     return (

                        <SubMovie
                            key={i}
                            value={movie}
                            doSearch={this.props.doSearch}
                        />
                        )
                    })
                }
            </div>
        )
    }
}

export default SimilarMovies;