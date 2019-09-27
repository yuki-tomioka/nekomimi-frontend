// @flow
import React from 'react';
// cssファイルの読み込み
import '../css/heading.css';

// propsの型定義
type Props = {
  name: string;
}

const Heading = (props: Props) => {
  const { name } = props;
  return <h1 className="text">{`Hello ${name} World!`}</h1>;
};

export default Heading;
