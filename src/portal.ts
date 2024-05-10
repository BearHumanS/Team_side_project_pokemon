import ReactDOM from 'react-dom';
import { childrenProps } from './lib/type';

export const Modalportal = ({ children }: childrenProps) => {
  const el = document.getElementById('modal')!;
  return ReactDOM.createPortal(children, el);
};
