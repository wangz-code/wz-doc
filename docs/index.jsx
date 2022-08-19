/*
 * @Author: wangqz
 * @Date: 2022-08-17
 * @LastEditTime: 2022-08-18
 * @Description: content
 */
import React from 'react';
import './index.css';
const topStyle = {
  marginTop: '2vh',
};
const divStyle = {
  textAlign: 'right',
  height: 'calc(100vh - 58vh - 290px)',
};

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
  post(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = JSON.parse(xhr.responseText);
        callback(res);
      }
    };
  },
};

export default class Home extends React.Component {
  state = {
    hitokoto: {},
  };

  toggleClass = () => {
    const body = document.getElementById('clockbody');
    body.classList.toggle('light');
  };

  hitokoto = () => {
    http.get('https://v1.hitokoto.cn', res => {
      console.log('res log==>', res);
      this.setState({
        hitokoto: res,
      });
    });
  };

  componentDidMount() {
    this.hitokoto();
    const hr = document.querySelector('#hr');
    const mn = document.querySelector('#mn');
    const sc = document.querySelector('#sc');
    const time = document.querySelector('.time');
    setTimeout(() => {
      const footer = document.getElementsByClassName(
        '__dumi-default-layout-footer-meta',
      )[0];
      footer.innerHTML = `
       <a  class="beian" href="https://beian.miit.gov.cn" target="_blank">
        <img width="15"  src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"/>
        <span>&nbsp; 豫ICP备2022007076号</span>
       </a>`;
    }, 0);

    setInterval(() => {
      let day = new Date();
      let hour = day.getHours();
      let min = day.getMinutes();
      let sec = day.getSeconds();

      let hrPosition = hour * 30 + min / 2; //hour * 360/12 + ((min * 360/60)/12)
      let minPosition = min * 6; //min * 360/60
      let secPosition = sec * 6; //sec * 360/60

      hr.style.transform = `rotateZ(${hrPosition}deg)`;
      mn.style.transform = `rotateZ(${minPosition}deg)`;
      sc.style.transform = `rotateZ(${secPosition}deg)`;

      if (sec < 10) {
        sec = '0' + sec;
      }
      if (min < 10) {
        min = '0' + min;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }

      time.textContent = hour + ' : ' + min + ' : ' + sec;
    }, 1000);
  }

  render() {
    return (
      <div>
        <div id="clockbody" className="light">
          <div className="light">
            <div className="clock">
              <div className="hour">
                <div className="hr" id="hr"></div>
              </div>
              <div className="min">
                <div className="mn" id="mn"></div>
              </div>
              <div className="sec">
                <div className="sc" id="sc"></div>
              </div>
              <div className="indicators">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="nums">
                <span id="three">3</span>
                <span id="six">6</span>
                <span id="nine">9</span>
                <span id="twelve">12</span>
              </div>
              <div className="time"></div>
            </div>
            <div className="toggleClass" onClick={this.toggleClass}></div>
          </div>
        </div>

        <h4 style={topStyle}>
          如果尖锐的批评完全消失，温和的批评将会变得刺耳。如果温和的批评也不被允许，沉默将被认为居心叵测。如果沉默也不再允许，赞扬不够卖力将是一种罪行。如果只允许一种声音存在，那么，唯一存在的那个声音就是谎言。
        </h4>
        <h4 style={divStyle}>- 柏拉图</h4>
        <br />
        <h4 >{this.state.hitokoto.hitokoto}</h4>
        
      </div>
    );
  }
}
