import React, { useEffect, useState } from 'react';

import '../../public/spectre.css';
import './index.css';

const http = {
  get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = JSON.parse(xhr.responseText);
        callback(res);
      }
    };
  },
};

export class NuNu extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      where: '',
      page: 1,
      limit: 10,
      result: { count: 0, data: [] as any },
      pages: [],
    };
  }

  queryChange(val) {
    this.setState(val, this.query);
  }

  showDetail(href) {
    window.open(href, 'target');
  }

  // 计算分页  [1~5] 尾页
  query() {
    const { limit, page, where } = this.state;
    http.get(
      `https://djgo.cc/print/getvideo?page=${page}&limit=${limit}&where=${where}`,
      result => {
        // 计算分页
        const pages = [];
        if (result.count <= limit) {
          pages.push(1);
        } else {
          for (let i = 0; i < Math.ceil(result.count / limit); i++) {
            if (pages.length < 5) {
              pages.push(i + 1);
            } else if (i < Math.ceil(result.count / limit) - 1) {
              pages.push(i + 1);
            }
          }
        }
        console.log(result);
        this.setState({ result, pages });
      },
    );
  }

  componentDidMount() {
    console.log('this log==>', this);

    this.query();
  }

  render() {
    return (
      <div>
        <div className="layui-form-item">
          <label className="layui-form-label">
            <h2>搜索</h2>
          </label>
          <div className="layui-input-block">
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              placeholder="片名"
              value={this.state.where}
              onChange={e => this.queryChange({ where: e.target.value })}
            />
            <div className="flex">
              <span>共 {this.state.result.count} 个</span>
              <ul className="pagination">
                {this.state.pages.map(item => {
                  return (
                    <li
                      key={item}
                      className={
                        item == this.state.page
                          ? 'page-item  active'
                          : 'page-item'
                      }
                    >
                      <a
                        href="#"
                        onClick={() => this.queryChange({ page: item })}
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <select
                className="form-select pagesize m-sm"
                value={this.state.limit}
                onChange={e => this.queryChange({ limit: e.target.value })}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-grad">
          {this.state.result.data.map((item, idx) => {
            return (
              <div
                className="card card-mv"
                key={idx}
                onClick={() => this.showDetail(item.href)}
              >
                <div className="card-image">
                  <img
                    src={item.thumb}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="img-responsive fill"
                  />
                </div>
                <div className="card-header">
                  <div className="card-title h5 text-max">
                    {item.name} {item.rate}
                  </div>
                  <div className="card-subtitle text-gray text-max">
                    {item.clarity}| {item.countrie}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
