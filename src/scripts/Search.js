import React, {Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {query: ''};
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="learn about..."
                    value={this.state.query}
                    onChange={event => {
                        this.setState({query: event.target.value})
                    }}
                    onKeyPress={event => {
                        if (event.key === 'Enter') this.props.doSearch(this.state.query)
                    }}
                />
                <button className="btn btn-sm" onClick={() => this.props.doSearch(this.state.query)}><i
                    className="fa fa-search"/></button>
            </div>
        )
    };
}

export default Search;
