import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export interface TagProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  className?: string;
  size?: 's' | 'm';
  color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary';
  href?: string;
}
