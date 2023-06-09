import classNames, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: Argument[]) => twMerge(classNames(args));
