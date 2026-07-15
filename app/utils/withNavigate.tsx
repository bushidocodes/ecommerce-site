import { ComponentType } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export interface WithNavigateProps {
  navigate: NavigateFunction;
}

export default function withNavigate<P extends WithNavigateProps>(
  Component: ComponentType<P>
): ComponentType<Omit<P, keyof WithNavigateProps>> {
  return function WithNavigate(props: Omit<P, keyof WithNavigateProps>) {
    const navigate = useNavigate();
    return <Component {...(props as P)} navigate={navigate} />;
  };
}
