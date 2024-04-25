import { Navigate, Route, Routes } from "react-router-dom";
import Garage from "./app/features/garage/Garage";
import Winners from "./app/features/winners/Winners";

function App() {
  return (
    <Routes>
      <Route index path="/garage" element={<Garage />} />
      <Route path="/winners" element={<Winners />} />

      <Route path="*" element={<Navigate to="/garage" />} />
    </Routes>
  );
}

export default App;
