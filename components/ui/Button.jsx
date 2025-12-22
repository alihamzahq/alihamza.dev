import Link from 'next/link';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  white: 'btn-white',
  'white-outline': 'btn-white-outline',
  dark: 'btn-dark',
  ghost: 'btn-ghost',
};

const sizes = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  iconOnly = false,
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const iconClass = iconOnly ? 'btn-icon' : '';

  const combinedClassName = `${baseClass} ${variantClass} ${sizeClass} ${iconClass} ${className}`.trim();

  // External link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link
  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  // Button
  return (
    <button type="button" className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
