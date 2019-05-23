import {DatePicker} from 'antd/lib/index';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import $ajax from '../../api/ajax';

// 异步请求使用方法示例
// $ajax.getUserInfo.then(result => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// });


class Root extends React.Component {
    render() {
        return <div>
            <DatePicker/>
        </div>;
    }
}

ReactDOM.render(<Root/>, document.getElementById("root"));
