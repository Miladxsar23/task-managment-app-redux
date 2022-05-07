import * as React from "react";
const FlashMessage = (props) => {
  return (
    <div className="alert alert-danger text-center" role="alert">
      {props.message}
    </div>
  );
};

FlashMessage.defaultProps = {
  message: "an error occurred!",
};
export default FlashMessage;
