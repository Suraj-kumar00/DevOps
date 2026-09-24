import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  primary:
    'bg-fd-primary text-fd-primary-foreground shadow-sm hover:bg-fd-primary/90 focus-visible:outline-fd-primary',
  outline:
    'border bg-fd-background text-fd-foreground hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-fd-ring',
  ghost: 'text-fd-foreground hover:bg-fd-accent focus-visible:outline-fd-ring',
} as const;

const sizes = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
} as const;

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

/** A link styled as a button. Use it for navigation; use a real <button> for actions. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 [&_svg]:size-4',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
