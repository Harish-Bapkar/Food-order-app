import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h1>Opps Something went wrong</h1>
      <h2>
        {err.status}:{err.statusText}
      </h2>
      <h1 className="error-msg">{err.data}</h1>
    </div>
  );
};

export default Error;
