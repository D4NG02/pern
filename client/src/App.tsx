import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useStateProvider } from "./Utility/Reducer/StateProvider";
import LoginPage from "./Routes/LoginPage";
import DashboardPage from "./Routes/DashboardPage";

export default function App() {
  const queryClient = new QueryClient()
  const [{ token }, dispatch] = useStateProvider()

  return (
    <Fragment>
      <LoginPage />

      {token && 
        <QueryClientProvider client={queryClient}>
          <DashboardPage />
        </QueryClientProvider>
      }
    </Fragment>
  );
}
