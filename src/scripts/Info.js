import React, {Component} from 'react';

class Info extends Component {
    
    render() {
        let movieInfo = {title: '', overview: '', poster_path: '', genre_ids:[]};
        if(this.props.movieInfo !=null) {
            movieInfo = this.props.movieInfo;
        }
       
        const imgUrl = 'https://image.tmdb.org/t/p/w185';
        
        //for rating
        const totalRating = 10;
        const currentRating = (movieInfo.vote_average / totalRating)*100;
        const roundRating = Math.round(currentRating /10)*10;
        
        return (
            <div>
                <img className="poster" src={imgUrl+movieInfo.poster_path} alt="poster"/>
                <h2>{movieInfo.title}</h2>
                <div className="stars-outer">
                  <div className="stars-inner" style={{width: roundRating+'%'}}></div>
                </div>
                <h3>Overview</h3>
                <p>{movieInfo.overview}</p>
            </div>
        )
    }
}

export default Info;