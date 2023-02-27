import React, { FC, SVGAttributes } from 'react';

type Props = SVGAttributes<HTMLOrSVGElement> & {
  icon: string;
  size: number;
}

export const Icon: FC<Props> = ({ icon, size, ...props }) => {
  return (
    <svg width={size} height={size} {...props} >
      <use href={`#${icon}`} />
    </svg>
  );
};
