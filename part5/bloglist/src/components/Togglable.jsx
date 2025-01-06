import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [isVisible, setIsVisible] = useState(false);
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility: () => setIsVisible((prev) => !prev),
    };
  });
  return (
    <div>
      {isVisible ? (
        <>
          {children}
          <button onClick={() => setIsVisible(false)}>cancel</button>
        </>
      ) : (
        <button onClick={() => setIsVisible(true)}>{buttonLabel}</button>
      )}
    </div>
  );
});

export default Togglable;
