import {DatePicker} from 'antd/lib/index';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

class Root extends React.Component {
    render() {
        return <div>
            <DatePicker/>
        </div>
    }
}

ReactDOM.render(<Root/>, document.getElementById("root"));
