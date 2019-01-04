/**
 * Create by fay on 2019-01-03 17:36
 */
import React from 'react';
import Printscreen from '../home/views/printscreen';

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            run: false
        }
    }


    runPrintscreen = () => {
        this.setState({
            run: true
        })
    };

    onChange = (imgBase64, width, height) => {
        const img = new Image();
        img.src = imgBase64;
        img.width = width;
        document.body.appendChild(img);
    };

    render() {
        return (
            <div>
                <button onClick={this.runPrintscreen} style={{display: 'none'}} id='fay-printscreen-run'/>
                <Printscreen run={this.state.run} onChange={this.onChange}/>
            </div>
        )
    }
}