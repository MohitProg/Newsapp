import React, { Component } from 'react'


export class Newsitem extends Component {
  render() {
   const  {title,description,imageurl,newsurl,author}=this.props;
    return (
     <>
<div className="card my-3">
  <img src={imageurl==null?"https://media.cnn.com/api/v1/images/stellar/prod/230918164944-justin-trudeau-0918.jpg?c=16x9&q=w_800,c_fill":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary"> {author} </small></p>
    <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
</>
    )
  }
}

export default Newsitem
