import { Routes, Route } from "react-router-dom";
import PageShell from "./components/PageShell";
import Protected from "./components/Protected";
import Dashboard from "./pages/dashboard/Dashboard";
import HistoryDetails from "./pages/history-details/HistoryDetails";
import ListAthletes from "./pages/list-athletes/ListAthletes";
import Login from "./pages/login/Login";
import RegisterAthletes from "./pages/register-athletes/RegisterAthletes";
import ViewAthlete from "./pages/view-athlete/ViewAthlete";

export default function Router() {
  
  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected />}>
          <Route element={<PageShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/list" element={<ListAthletes />} />
            <Route path="/create" element={<RegisterAthletes />} />
            <Route path="/athlete" element={<ViewAthlete />} />
            <Route path="/history">
              <Route path=":id" element={<HistoryDetails />} />
            </Route>
            <Route path="/edit" element={<RegisterAthletes />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
