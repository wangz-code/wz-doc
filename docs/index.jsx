/*
 * @Author: wangqz
 * @Date: 2022-08-17
 * @LastEditTime: 2022-08-17
 * @Description: content
 */
import React from 'react';
import './index.css';
const topStyle = {
  marginTop: '2vh',
};
const divStyle = {
  textAlign: 'right',
  height: 'calc(100vh - 58vh - 190px)',
};

export default class Home extends React.Component {
  toggleClass = () => {
    const body = document.getElementById('clockbody');
    body.classList.toggle('light');
  };
  componentDidMount() {
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
      <>
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
        <h3 style={topStyle}>世间本无路，走的人多了，也就成了路。</h3>
        <h3 style={divStyle}>——鲁迅</h3>
      </>
    );
  }
}
