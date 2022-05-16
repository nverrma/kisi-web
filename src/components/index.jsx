import React from "react"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SideTab from "./sideTab";
import GroupLocks from "./groupsLock"
// import Groups from "./groups";
const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<SideTab />} />
      <Route path="/grouplocks" element={<GroupLocks />} />
      {/* <Route path="/" element={<SideTab />} /> */}
    </Routes>
  )
};
export default Index;