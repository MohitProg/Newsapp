import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes  from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {



  static defaultProps={
    country:"in",
    pageSize:5,
    category:"general"
  }

  static propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string,

  }




  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0

    }

    document.title=`${this.props.category}-Desi News`



  }

  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b065d213e87b422cbfa9e258f75b2925&page=${this.state.page}&pageSize=${this.props.pagesize}`
    this.setState({loading:true});
    this.props.setProgress(30)
    let data = await fetch(url);
    let parsedata = await data.json();
    this.props.setProgress(70)
    console.log(parsedata.articles)
    this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults,loading:false })


    this.props.setProgress(100)

  }


  fetchMoreData = async() => {


    this.setState({page:this.state.page+1})


     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b065d213e87b422cbfa9e258f75b2925&page=${this.state.page+1}&pageSize=${this.props.pagesize}`
    //  this.setState({loading:true});
     let data = await fetch(url);
     let parsedata = await data.json();

     console.log(parsedata.articles)

     this.setState({
       articles: this.state.articles.concat(parsedata.articles),
       totalResults: parsedata.totalResults,
       loading:false 
      
      })
  
  };


  // handleprev = async () => {
  //   console.log("this is previous")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b065d213e87b422cbfa9e258f75b2925&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`

  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedata = await data.json();
  //   console.log(parsedata)

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedata.articles,
  //     loading:false

  //   })
  // }

  // handlenext = async () => {
  //   console.log("this is next")

  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b065d213e87b422cbfa9e258f75b2925&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parsedata = await data.json();
  //     console.log(parsedata)

  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedata.articles,
  //       loading:false
        




  //     })


  // }



  render() {

    return (
      <>

          <h1 className='text-center' style={{marginTop:"90px"}}>Desi News -Top Headline On-{this.props.category}category</h1>
          {this.state.loading && <Spinner />}


          {/* infuinte scroll */}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner></Spinner>}
        >

        <div className="container mt-3">


          <div className="row justify-content-center">
            {!this.state.loading&&
              this.state.articles.map((element) => {
                return (

                  <div className="col-lg-4 col-md-6" key={element.url}    >
                    <Newsitem title={element.title } description={element.description } imageurl={element.urlToImage} newsurl={element.url} author={element.author?element.author:""}/>
                  </div>



                )
              })
            }





          </div>
                    
        </div>

          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between p-4" >

            <button disabled={this.state.page <= 1} type="button" onClick={this.handleprev} className="btn btn-primary"> &larr;Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-primary" onClick={this.handlenext}>Next &rarr;</button>
          </div> */}



      </>
    )
  }
}

export default News;
