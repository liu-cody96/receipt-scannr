import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Error, HomePage } from "./pages";

const App = () => {
  return (
    <>

    { /* everything inside of BrowserRouter is going to be managed by react-router-dom so that it can toggle between pages} */ }
      <BrowserRouter>

        <Routes>
            {/* route to landing page if browser URL becomes '/' */}
            <Route path="/" element={<HomePage/>}></Route>
            {/* route anything else to the error page */}
            <Route path="/*" element={<Error/>}></Route>
        </Routes>

      </BrowserRouter>


    </>
  );
}

export default App;
