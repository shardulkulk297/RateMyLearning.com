import React from 'react'

const Search = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="search-container">
                        <input type="text" className="form-control search-input" placeholder="🔍 Search for what you want to learn..."/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search