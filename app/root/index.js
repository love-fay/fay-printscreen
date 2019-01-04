import React from 'react';
import {withRouter} from 'react-router-dom';
import Common from './common';
import Home from '../home';
import './style/index.scss';

class Root extends React.Component{

    render(){
        const {location} = this.props;
        const {pathname} = location;
        const pathPrefix = pathname.split('/')[1];
        const router = {
            '': <Home/>,
        };
        return (
            <div style={{height: '100%'}}>
                {router[pathPrefix] || router['comingSoon']}
                <Common/>
            </div>
        )
    }
}


export default withRouter(Root);