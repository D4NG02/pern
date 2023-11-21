import { Fragment, useEffect, useState } from "react";

import { useStateProvider } from "./Utility/Reducer/StateProvider";
import LoginPage from "./Routes/LoginPage";
import DashboardPage from "./Routes/DashboardPage";

export default function App() {
  const [{ token }, dispatch] = useStateProvider()

  return (
    <Fragment>
      <LoginPage />

      {token && <DashboardPage />}
    </Fragment>
  );
}
