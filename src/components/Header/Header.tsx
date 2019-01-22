import * as React from 'react';
import {
  HeaderContainer,
} from './header.styled';
import IogoSmall from './logo-small.png';

interface IProps {
  testingProps?: string;
}

function Header(props: IProps) {
  return (
    <HeaderContainer>
      <span>
        <img src={IogoSmall} alt={'logo'} />
      </span>
      <span>
        Hello {props.testingProps} !
        </span>
    </HeaderContainer>
  );
}

export default Header;
