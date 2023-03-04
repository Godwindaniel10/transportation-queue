import React from "react";
import LogisticQueue from "./components/LogisticQueue";
import Planner from "./components/Planner";

function App() {
  return (
    <div className="bg-[#50AEAE] min-w-[1800px] mx-auto min-h-screen flex justify-between items-center gap-x-12 px-[50px]">
      <LogisticQueue />
      <Planner />
    </div>
  );
}

export default App;
