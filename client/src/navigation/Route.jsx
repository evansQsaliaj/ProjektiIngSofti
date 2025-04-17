import useJobContext from "../hooks/use-job";

export default function Route({ path, children }) {
  const { currentPath } = useJobContext();

  if (currentPath === path) {
    return children;
  }

  return null;
}
