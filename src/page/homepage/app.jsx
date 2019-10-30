import React from 'react';
import ReactDOM from 'react-dom';
import 'common/css/reset.css';
import './style.scss';

class BuyWhat extends React.Component {
    componentWillMount () {
        this.setState(Object.assign({}, this.state, window.data));
    }

    state = {
        id: '',
        name: '',
        price: '',
        reason: '',
        href: '',
        searchID: ''
    };

    render () {
        return <div className="content">
            <table className='table'>
                <tbody>
                <tr>
                    <td>ID</td>
                    <td>{this.state.id}</td>
                </tr>
                <tr>
                    <td>商品名</td>
                    <td>{this.state.name}</td>
                </tr>
                <tr>
                    <td>商品价格</td>
                    <td>{this.state.price}</td>
                </tr>
                <tr>
                    <td>推荐理由</td>
                    <td>{this.state.reason}</td>
                </tr>
                <tr>
                    <td>商品链接</td>
                    <td>
                        {
                            this.state.href ? <a href={this.state.href}>点击访问商品链接</a> : '木有链接'
                        }
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="search">
                输入ID搜索指定商品
                <input type="number"
                       value={this.state.searchID}
                       onChange={e => this.changeSearchID(e.target.value)}/>
                <button onClick={this.search}>搜索</button>
            </div>

            <div className='description'>
                <h4>本页面作者：零零水。联系方式：QQ：20004604，微信：qq20004604</h4>
                <h4>如果你有有趣或者值得购买的东西，想要分享给大家，可以加这个QQ群【双十一买什么呀，群号：850939752】，或者 <a
                    href="https://jq.qq.com/?_wv=1027&k=5GBUAq9">点击链接加入群聊【双十一买什么呀】</a>
                </h4>
                <h4>当然，你也可以加入微信群，以下是二维码：</h4>
                <img src="http://119.3.214.234/buywhat.png" alt="" className='wechat-img'/>
            </div>
        </div>;
    }

    changeSearchID = v => {
        this.setState({
            searchID: v
        });
    };

    search = () => {
        let id = this.state.searchID;
        window.location.href = '?id=' + id;
    };
}

class My extends React.Component {
    state = {
        name: ''
    };

    render () {
        return <div className="content">

        </div>;
    }
}

class Root extends React.Component {
    state = {
        focusTab: 'buy-what'
    };

    render () {
        return <div id='box'>
            {
                this.state.focusTab === 'buy-what' ? <BuyWhat/> : <My/>
            }
            <div className="footter">
                <div className={`item ${this.state.focusTab === 'buy-what' ? 'focus' : ''}`}
                     onClick={() => this.changeTab('buy-what')}>
                    买买买
                </div>
                <div className={`item ${this.state.focusTab === 'my' ? 'focus' : ''}`}
                     onClick={() => this.changeTab('my')}>
                    施工中
                </div>
            </div>
        </div>;
    }

    changeTab = (tab) => {
        this.setState({
            focusTab: tab
        });
    };
}

ReactDOM.render(<Root/>, document.getElementById('root'));
