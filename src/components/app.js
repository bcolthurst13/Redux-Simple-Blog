import React from 'react';
import { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Snackbar from 'material-ui/Snackbar';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            message: ''
        }
    }

    toast = (message) => {
        this.setState({
            open: true,
            message: message
        });
    };

    toastClose= () => {
      this.setState({
          open: false
      });
    };

  render() {
      const childrenWithProps = React.Children.map(this.props.children,
          (child) => React.cloneElement(child, {
              toast: this.toast
          })
      );

    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                {childrenWithProps}
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.toastClose}/>
            </div>
        </MuiThemeProvider>
    );
  }
}
