import { useRouter } from 'next/router';
import Link from 'next/link';
import { cloneElement, Children, FC, isValidElement } from 'react';

interface ActiveLinkInterface {
  activeClassName: string;
  href: string;
  className?: string;
}

const ActiveLink: FC<ActiveLinkInterface> = ({
  children,
  activeClassName,
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childCLassName =
    (isValidElement(child) && child!.props.className) || '';
  const className =
    asPath === props.href
      ? `${childCLassName} ${activeClassName}`
      : childCLassName;

  return (
    <Link {...props}>
      {cloneElement(isValidElement(child!) ? child! : <a></a>, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
