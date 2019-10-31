import React from 'react';
import ReactDOM from 'react-dom';
import 'common/css/reset.css';
import './style.scss';
import $ajax from 'api/ajax.js';

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
        is_manager: 0,
        searchID: ''
    };

    render () {
        return <div className="content">
            <h1>双十一剁手器 <img className='knife' src={require('assets/knife.png')} alt=""/></h1>
            <table className='table'>
                <thead>
                <tr>
                    <th></th>
                    <th>商品</th>
                </tr>
                </thead>
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
                            this.state.href ? <a href={this.state.href}>
                                <button>点击访问商品链接</button>
                            </a> : '木有链接'
                        }
                    </td>
                </tr>
                <tr>
                    <td>管理员推荐</td>
                    <td>
                        {this.state.is_manager ? <span className='is-mananger-push'>'是'</span> : '否'}
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="random">
                <button onClick={this.randomItem}>点击按钮，随机推荐下一个商品</button>
            </div>

            <div className="search">
                <div className='row'>输入ID搜索指定商品</div>
                <div className='row'>
                    <input type="number"
                           value={this.state.searchID}
                           onChange={e => this.changeSearchID(e.target.value)}/>
                    <br/>
                </div>
                <div className='row'>
                    <button onClick={this.search}>搜索</button>
                </div>
            </div>

            <div className='description'>
                <h4>想推荐/分享/寻找更多有趣的东西？微信群二维码如下：</h4>
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

    randomItem = () => {
        window.location.href = '?last=' + this.state.id;
    };
}

class My extends React.Component {
    state = {
        name: '',
        price: '',
        reason: '',
        href: '',
        submitting: false
    };

    render () {
        return <div className="content">
            <table className='add-item'>
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>商品名（必填）</td>
                    <td><input type="text"
                               className='input'
                               placeholder='只要能描述清楚商品是什么即可'
                               value={this.state.name}
                               onChange={e => this.changeInput(e.target.value, 'name')}/></td>
                </tr>
                <tr>
                    <td>价格（必填）</td>
                    <td><input type="number"
                               className='input'
                               value={this.state.price}
                               placeholder='大概数字即可，不能是小数'
                               onChange={e => this.changeInput(e.target.value, 'price')}/></td>
                </tr>
                <tr>
                    <td>推荐理由<br/>（选填）</td>
                    <td><textarea type="text"
                                  className='textarea'
                                  placeholder='靠谱的推荐理由可以提高通过率'
                                  value={this.state.reason}
                                  onChange={e => this.changeInput(e.target.value, 'reason')}/></td>
                </tr>
                <tr>
                    <td>商品链接<br/>（选填）</td>
                    <td><textarea type="text"
                                  className='textarea'
                                  placeholder='目前只接受大的电商公司的商品链接。不超过240字'
                                  value={this.state.href}
                                  onChange={e => this.changeInput(e.target.value, 'href')}/></td>
                </tr>
                </tbody>
            </table>
            <div className="notice">
                <p><b>说明：</b></p>
                <p>为了防止浪费大家时间，推荐商品时，需要经过管理员审核。</p>
                <p>
                    高质量的商品会通过审核，例如：有特色的、性价比高的、感兴趣的人比较多的、比较有用的、优惠力度大的。
                </p>
            </div>
            <button className='submit' onClick={this.submit}>
                {
                    this.state.submitting ? '提交中' : '点击提交'
                }
            </button>
        </div>;
    }

    changeInput = (v, type) => {
        this.setState({
            [type]: v
        });
    };

    submit = () => {
        if (this.state.submitting) {
            return;
        }
        this.setState({
            submitting: true
        });
        const data = this.state;
        $ajax.addItem(data).then(result => {
            console.log(result);
            alert(result.data.msg);
            this.setState({
                name: '',
                price: '',
                reason: '',
                href: ''
            });
        }).catch(err => {
            console.error(err);
            alert('未知错误');
        }).finally(() => {
            this.setState({
                submitting: false
            });
        });
    };
}

class Root extends React.Component {
    state = {
        focusTab: 'buy-what'
        // focusTab: 'my'
    };

    render () {
        return <div id='box'>
            {
                this.state.focusTab === 'buy-what' ? <BuyWhat/> : <My/>
            }
            <div className="footter">
                <div className={`item ${this.state.focusTab === 'buy-what' ? 'focus' : ''}`}
                     onClick={() => this.changeTab('buy-what')}>
                    剁手器<img className='knife' src={require('assets/knife.png')} alt=""/>
                </div>
                <div className={`item ${this.state.focusTab === 'my' ? 'focus' : ''}`}
                     onClick={() => this.changeTab('my')}>
                    我也来推荐一个
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
