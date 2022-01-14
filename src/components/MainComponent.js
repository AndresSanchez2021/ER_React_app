import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';



class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      comments:COMMENTS,
      leaders:LEADERS,
      promotions:PROMOTIONS
    };
  }
  

  render(){
    const HomePage = ()=>{
      return(
        <Home 
          dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
          promotion={this.state.promotions.filter((promo)=>promo.featured) [0]}
          leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    }

    const DishWithId= ({match})=>{
      return(
        <DishDetail
          dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))} 
        />
      );
    }
    const AboutPage = ()=><About leaders={this.state.leaders}/>
    
    
    
    return (
      <div className="App">
        <Header/>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>} />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path ="/contactus" component={Contact}/>
            <Route exact path ="/aboutus" component={AboutPage}/>
            <Redirect to="/home"/>
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
