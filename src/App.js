
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pagesize=15;
  



  state={
    progress:0
  }


  setProgress=(progress)=>{
    this.setState({progress:progress})

  }
  render() {
    this.name = "mohit sharma";

    return (
      <>
   

        <BrowserRouter>
          <Navbar />
          <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}

      />
          <Routes>
            <Route  path='/' element={<News   setProgress={this.setProgress}  key="general" pagesize={this.pagesize} country="in" category="general" />} />
            <Route   path='/business' element={<News   setProgress={this.setProgress}  key="business" pagesize={this.pagesize} country="in" category="business" />} />
            <Route  path='/entertainment' element={<News   setProgress={this.setProgress}   key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" />} />
  
            <Route  path='/health' element={<News   setProgress={this.setProgress}   key="health" pagesize={this.pagesize} country="in" category="health"/>} />
            <Route   path='/science' element={<News   setProgress={this.setProgress}  key="science" pagesize={this.pagesize} country="in" category="science" />} />
            <Route   path='/technology' element={<News   setProgress={this.setProgress}  key="technology" pagesize={this.pagesize} country="in" category="technology" />} />


          </Routes>

        </BrowserRouter>

      </>

    )
  }
}

