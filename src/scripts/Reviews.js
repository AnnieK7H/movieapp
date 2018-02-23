import React, {Component} from 'react';

class Reviews extends Component {
    render() {
        let reviews = {content: ""};
        reviews = this.props.reviews;
        
        return (
            <div>
                {
                reviews.map((review, i) => {
                    let movieRev = review.content;
                    let reviewAuthor = review.author;
                    return (    
                        <div key={i}>
                          <p className="author">{reviewAuthor}</p>
                          <p>{movieRev}</p>
                        </div>
                    )
                })
                }
                <h3>Write your own review!</h3>
                <textarea
                    rows="10"
                />
                <button className="float-right postButton">Post</button>
            </div>
        )
    }
}

export default Reviews;