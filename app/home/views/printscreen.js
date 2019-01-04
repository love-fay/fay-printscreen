/**
 * Create by fay on 2019-01-03 08:38
 */
import React from 'react';
import html2canvas from 'html2canvas';

const initStyle = {
    border: '1px solid #000000',
    position: 'absolute',
    display: 'none',
    zIndex: '9999'
};

const initButtonsStyle = {
    position: 'relative',
    display: 'none',
    width: '40px'
};

const initMaskStyle = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    backgroundColor: '#eeeeee',
    opacity: '0.1',
    display: 'none',
};

export default class Printscreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            style: {},
            buttonsStyle: {},
            maskStyle: {},
            run: false
        };
        this.startX = 0;
        this.startY = 0;
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.run){
            this.setState({run: true})
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextState.run){
            this.onListenMousedown();
            this.onListenMouseup();
            this.changeCursor();
        }else{
            this.revertCursor();
        }
    }

    changeCursor = () => {
        document.body.style.cursor = 'crosshair';
    };

    revertCursor = () => {
        document.body.style.cursor = 'auto';
    };

    mousedownPosition = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        this.startX = x;
        this.startY = y;
        this.setState({style: {top: y, left: x, display: 'block'}, maskStyle: {display: 'block'}});
        this.onListenMousemove();
    };

    mousemovePosition = (e) => {
        const {style} = this.state;
        const x = e.clientX;
        const y = e.clientY;
        let left, top;
        left = this.startX > x ? x : this.startX;
        top = this.startY > y ? y : this.startY;
        this.setState({
            style: {...style, top, left, width: Math.abs(this.startX - x), height: Math.abs(this.startY - y)},
            buttonsStyle: {top: Math.abs(this.startY - y), left: Math.abs(this.startX - x) - 40}
        });
    };

    mouseupPosition = (e) => {
        this.setState({buttonsStyle: {...this.state.buttonsStyle, display: 'block'}});
        this.removeListenMousemove();
        this.removeListenMousedown();
        this.removeListenMouseup();
        this.onMousedownCancel();
    };

    onListenMousedown = () => {
        top.document.onmousedown = this.mousedownPosition;
    };

    removeListenMousedown = () => {
        top.document.onmousedown = null;
    };

    onListenMousemove = () => {
        top.document.onmousemove = this.mousemovePosition;
    };

    removeListenMousemove = () => {
        top.document.onmousemove = null;
    };

    onListenMouseup = () => {
        top.document.onmouseup = this.mouseupPosition;
    };

    removeListenMouseup = () => {
        top.document.onmouseup = null;
    };

    onConfirmMousedown = (e) => {
        const {top, left, width, height} = this.state.style;
        html2canvas(document.body, {x: left+1, y: top+1, width: width, height: height}).then(canvas => {
            const {onChange} = this.props;
            onChange && onChange(canvas.toDataURL(), width, height);
        });
    };

    cancel = () => {
        this.setState({style: initStyle, buttonsStyle: initButtonsStyle, maskStyle: initMaskStyle, run: false});
    };

    onMousedownCancel = (e) => {
        document.onmousedown = (e) => {
            this.cancel();
            document.onmousedown = null;
        }
    };

    render(){
        const {style, buttonsStyle, maskStyle} = this.state;
        return (
            <div>
                <div style={{...initStyle, ...style}}>
                    <div style={{...initButtonsStyle, ...buttonsStyle}}>
                        <button onMouseDown={this.onConfirmMousedown}>确定</button>
                    </div>
                </div>
                <div style={{...initMaskStyle, ...maskStyle}}>
                </div>
            </div>
        )
    }
}