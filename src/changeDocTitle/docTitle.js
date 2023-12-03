import React from 'react';
function useTitle(title) {
  React.useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | app store`;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
export default useTitle;