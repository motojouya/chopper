import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import {
  Input,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  ListItemSecondaryAction,
  FormControlLabel,
  Grid,
  Button,
  Checkbox,
} from '@material-ui/core';
import styled from 'styled-components';
// import './App.css';

const recipes = [
  {
    title: 'にくじゃが',
    url: 'https://test-recipe/12345',
    info: {
      time: 30,
      amount: '3,4',
      keepable: '3',
    },
    ingredients: [
      { name: 'にんじん', amount: '1本' },
      { name: 'じゃがいも', amount: '1個' },
      { name: 'たまねぎ', amount: '1個' },
    ],
    orders: [
      'きる',
      'いためる',
      'やく',
    ],
    point: '醤油はすくなめ！'
  },
  {
    title: 'カレー',
    url: 'https://test-recipe/54321',
    info: {
      time: 60,
      amount: '5,6',
      keepable: '5',
    },
    ingredients: [
      { name: 'にんじん', amount: '1本' },
      { name: 'じゃがいも', amount: '1個' },
      { name: 'たまねぎ', amount: '1個' },
    ],
    orders: [
      'きる',
      'いためる',
      'やく',
      'ルー',
    ],
    point: 'たくさん作ろう！'
  },
  {
    title: '無限ピーマン',
    url: 'https://test-recipe/67890',
    info: {
      time: 10,
      amount: '1,2',
      keepable: '2',
    },
    ingredients: [
      { name: 'ピーマン', amount: '1個' },
      { name: 'マヨネーズ', amount: 'すこし' },
    ],
    orders: [
      'きる',
      'まぜる',
      'やく',
    ],
    point: '何も気をつける必要はない'
  },
  {
    title: 'かぶの浅漬',
    url: 'https://test-recipe/9876',
    info: {
      time: 10,
      amount: '1,2',
      keepable: '7',
    },
    ingredients: [
      { name: 'かぶ', amount: '1個' },
      { name: '酢', amount: 'すこし' },
    ],
    orders: [
      'きる',
      'まぜる',
    ],
    point: '漬けすぎないようにね！'
  },
  {
    title: 'にんじんシリシリ',
    url: 'https://test-recipe/10',
    info: {
      time: 30,
      amount: '3,4',
      keepable: '4',
    },
    ingredients: [
      { name: 'にんじん', amount: '1個' },
      { name: 'たまご', amount: 'すこし' },
    ],
    orders: [
      'シリシリする',
      '炒める',
      '卵でとじる',
    ],
    point: 'おいしいよ！'
  },
];

const Recipe = ({ recipe, width }) => {
  return (
    <Grid item xs={width}>
      <h2>{ recipe.title }</h2>
      <a href={recipe.url}>{ recipe.url }</a>
      { recipe.info &&
        <div>
          <h3>info</h3>
          <dl>
            <dt>時間</dt>
            <dd>{ recipe.info.time } 分</dd>
            <dt>人数</dt>
            <dd>{ recipe.info.amount } 人前</dd>
            <dt>冷蔵保存</dt>
            <dd>{ recipe.info.keepable } 日</dd>
          </dl>
        </div>
      }
      { recipe.ingredients &&
        <div>
          <h3>材料</h3>
          <dl>{
            recipe.ingredients.map(ingredient => {
              return (
                <React.Fragment>
                  <dt>{ ingredient.name }</dt>
                  <dd>{ ingredient.amount } { ingredient.unit }</dd>
                </React.Fragment>
              );
            })
          }</dl>
        </div>
      }
      { recipe.orders &&
        <div>
          <h3>手順</h3>
          <ol>{
            recipe.orders.map(order => {
              return (
                <li>{ order }</li>
              );
            })
          }</ol>
        </div>
      }
      { recipe.point &&
        <div>
          <h3>ポイント</h3>
          <p>{ recipe.point }</p>
        </div>
      }
    </Grid>
  );
}

const calculateColumnWidth = columns => {
  switch (columns) {
    case 1: return 12;
    case 2: return 6;
    case 3: return 4;
    case 4: return 3;
    case 5:
    case 6: return 2;
    default: return 1;
  }
};

const Form = () => {

  const [querys, setQuerys] = useState([]);
  const onClick = () => {
    window.location.href = window.location.href + '?query=' + querys.join(',');
  };
  const onEnter = e => {
    if (e.key === 'Enter') {
      console.log('value', e.target.value);
      setQuerys([
        ...querys,
        e.target.value,
      ]);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      <Input onKeyPress={onEnter} />
      <ul>
        { querys.map(query => (
          <li>{ query }</li>
        ))}
      </ul>
      <Button variant="contained" onClick={onClick}>
        レシピ
      </Button>
    </div>
  );
};

const App = ({ query }) => {

  const columnWidth = calculateColumnWidth(recipes.length);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <div style={{ width: '100%', height: '100%' }}>
      { loading &&
        <Loading />
      }
      { !loading && query &&
        <Grid container justify="center">
          { recipes.map(recipe => {
              return (
                <Recipe
                  recipe={recipe}
                  width={columnWidth}
                />
              );
          })}
        </Grid>
      }
      { !loading && !query &&
        <Form />
      }
    </div>
  );
};

const Loading = () => (<p style={{ width: '100%', height: '100%', textAlign: 'center' }}>Loading...</p>);

export default App;
