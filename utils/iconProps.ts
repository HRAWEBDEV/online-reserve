import { HTMLAttributes } from 'react';

type Props = {
 width?: string;
 height?: string;
 fill?: string;
} & HTMLAttributes<HTMLOrSVGElement>;

export { type Props };
