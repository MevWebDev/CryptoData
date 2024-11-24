import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="h-dvh w-screen flex flex-col items-center justify-center">
      <h1>ERROR 404</h1>
      <p>Page not found</p>
      <Link to="/">Back to home page</Link>
    </div>
  );
}

export default ErrorPage;
