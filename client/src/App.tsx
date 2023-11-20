import { Fragment, useEffect, useState } from "react";

import LoginPage from "./Routes/LoginPage";
import DashboardPage from "./Routes/DashboardPage";

export default function App() {

  return (
    <Fragment>
      <LoginPage />

      <DashboardPage />
    </Fragment>
  );
}
