import * as React from 'react';
import {
  HeaderContainer,
} from './Header.styled';
import IogoSmall from './logo-small.png';
import { Button } from 'antd';

interface IProps {
  testingProps?: string;
}

function Header(props: IProps) {
  const { testingProps } = props;
  return (
    <HeaderContainer>
      <Button type="primary">Button</Button>
      <span>
        <img src={IogoSmall} alt={'logo'} />
      </span>
      <span>
        Hello {testingProps} !
      </span>
    </HeaderContainer>
  );
}

export default Header;
