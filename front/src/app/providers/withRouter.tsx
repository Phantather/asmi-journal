import { BrowserRouter } from 'react-router-dom';
// import Loader from "~/shared/ui"

export const withRouter = (component: () => React.ReactNode) => () =>
  <BrowserRouter>{component()}</BrowserRouter>;
