import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <main>
        <div>
          <div>
            <h3>info</h3>
            <dl>
              <dt>時間</dt>
              <dd>20分</dd>
              <dt>人数</dt>
              <dd>3 - 4人前</dd>
              <dt>冷蔵保存</dt>
              <dd>4日</dd>
            </dl>
          </div>
          <div>
            <h3>材料</h3>
            <dl>
              <dt>にんじん</dt>
              <dd>1本</dd>
              <dt>たまねぎ</dt>
              <dd>1個</dd>
              <dt>じゃがいも</dt>
              <dd>1個</dd>
            </dl>
          </div>
          <div>
            <h3>手順</h3>
            <ol>
              <li>材料をきる</li>
              <li>煮込む</li>
              <li>味付ける</li>
            </ol>
          </div>
          <div>
            <h3>ポイント</h3>
            <p>醤油は控えめに</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
