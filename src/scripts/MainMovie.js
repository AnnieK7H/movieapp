import React, {Component} from 'react';
import Info from './Info';
import Trailer from './Trailer';
import Reviews from './Reviews';
import SimilarMovies from './SimilarMovies';
import Search from './Search';
import img from "../img/cinema.png";

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: null,
            movieTrailer: null,
            movieId: null,
            reviews: [],
            otherMovies: []
        };
        this.searchMovie = this.searchMovie.bind(this);
    }

    searchMovie(title, mainMovieId = null) {
        const keyUrl = 'api_key=dc8f01dda935f56c52ce1728099aa044&language=en-US';
        const baseUrl = `https://api.themoviedb.org/3/search/movie?${keyUrl}`;
        const fetchUrl = baseUrl + '&query=' + title;

        //fetching general movie info
        fetch(fetchUrl, {method: 'GET'}).then(response => response.json()).then(json => {
            if (json.results.length === 0) {
                this.setState({
                    movieId: 1
                });
                return;
            }

            if (!mainMovieId) {
                // No preference, use first (idx=0) as mainMovie
                this.setState({
                    movieId: json.results[0].id,
                    movieInfo: json.results[0],
                    otherMovies: json.results.slice(1)
                });
            } else {
                // find mainMovie from from the list
                let mainMovieIdx = json.results.findIndex(k => k.id === mainMovieId);
                this.setState({
                    movieId: json.results[mainMovieIdx].id,
                    movieInfo: json.results[mainMovieIdx],
                    otherMovies: json.results
                });
            }

            //fetching trailer
            const videoUrl = `https://api.themoviedb.org/3/movie/${this.state.movieId}/videos?${keyUrl}`;

            fetch(videoUrl, {method: 'GET'}).then(response => response.json()).then(json => {
                this.setState({movieTrailer: json.results[0]});
            });

            //fetching reviews
            const reviewsUrl = `https://api.themoviedb.org/3/movie/${this.state.movieId}/reviews?${keyUrl}`;

            fetch(reviewsUrl, {method: 'GET'}).then(response => response.json()).then(json => {
                this.setState({reviews: json.results});
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Read about movies</h1>
                <Search
                    doSearch={this.searchMovie}
                />
                <img className="logoImg float-right" src={require("../img/cinema.png")}/>

                {
                    this.state.movieInfo === null ?
                        <div><img className="defImg" src={require("../img/curtain.png")}/></div>
                        : (this.state.movieInfo === undefined ?
                            <div>This movie does not exist or maybe you misspeled it</div>
                            :
                            <div className="row">
                                <div className="col-sm-9" id="movieInfo">
                                    <Info
                                        className="section"
                                        movieInfo={this.state.movieInfo}
                                    />
                                    <Trailer
                                        className="section"
                                        movieTrailer={this.state.movieTrailer}
                                    />

                                    {
                                        this.state.reviews.length > 0 ? <h3>Reviews</h3> : <div/>
                                    }
                                    <Reviews
                                        className="section"
                                        reviews={this.state.reviews}
                                    />
                                </div>
                                <div className="col-sm-3 text-center similar">
                                    <h4>Movies with similar title</h4>
                                    <div><SimilarMovies
                                        otherMovies={this.state.otherMovies}
                                        doSearch={this.searchMovie}/>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default Movie;
