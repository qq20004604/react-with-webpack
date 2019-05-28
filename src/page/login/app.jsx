// import {DatePicker} from 'antd/lib/index';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.less';

class Root extends React.Component {
    render() {
        return <div>
            <div id="container">
                abc
            </div>
        </div>;
    }
}

ReactDOM.render(<Root/>, document.getElementById("root"));
