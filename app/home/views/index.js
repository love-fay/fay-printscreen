import React from 'react';
import '../../printscreen';
import ReactDom from "react-dom";
import Printscreen1 from "../../printscreen/button";

export default class App extends React.Component{

    componentDidMount() {
        window.printscreen.bind(document.getElementById('fay-printscreen'));
    }

    render() {
        return (
            <button id='fay-printscreen'>截图{ReactDom.createPortal(<Printscreen1/>, document.body)}</button>

        )
    }
}