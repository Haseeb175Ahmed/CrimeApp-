import React, { Component } from 'react';

import Button from '@material-ui/core/Button';




class ButtonClass extends Component {
    render() {
       return (
          <div>
               {/* <button  variant="contained" color="primary" onClick = {this.props.onClickEvent}>{this.props.title}</button>
               */}

      <Button variant="contained" color="primary" className={this.props.title} onClick = {this.props.onClickEvent}>
      {this.props.title}
      </Button>
        
          </div>
       );
    }
  }
  export default ButtonClass;