import classNames from "classnames";
import useJobContext from "../hooks/use-job";

export default function Link({ to, children, className, activeClassName }) {
  const { navigation, currentPath } = useJobContext();

  const classes = classNames(
    "text-black",
    className,
    to === currentPath && activeClassName
  );

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) return;

    event.preventDefault();

    navigation(to);
  };

  return (
    <a className={classes} onClick={handleClick} href={to}>
      {children}
    </a>
  );
}
