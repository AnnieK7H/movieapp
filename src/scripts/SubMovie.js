import React, {Component} from 'react';

class SubMovie extends Component {

    render() {
        const imgUrl = 'https://image.tmdb.org/t/p/w92';

        let movie = this.props.value;
        let id = movie.id;
        let title = movie.title;
        let moviePoster = movie.poster_path;
        return (
            <div>
                <a href="#" onClick={() => this.props.doSearch(title, id)}>
                    {moviePoster != null ?
                        <img src={imgUrl + moviePoster} alt="poster"/> :
                        <div className="imgPlaceholder"/>}
                    <p>{title}</p>
                </a>
            </div>
        )
    }
}

export default SubMovie;