import * as React from 'react';
import {
  HeaderContainer,
} from './Header.styled';
import IogoSmall from './logo-small.png';

interface IProps {
  testingProps?: string;
}

// tslint:disable-next-line function-name
function Header(props: IProps) {
  const { testingProps } = props;
  return (
    <HeaderContainer>
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
