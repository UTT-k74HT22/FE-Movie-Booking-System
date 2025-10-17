import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouter, privateRouter } from "./Router/routes";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRouter.map((route, index) => {
            const Layout = route.layout === null ? Fragment : Fragment;
            // nếu layout bằng null ko render ra layout
            // ngược lại render ra defautlayout( laayout tự tạo dùng chung)
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRouter.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={`private-${index}`}
                path={route.path}
                element={
                  <Fragment>
                    <Page />
                  </Fragment>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;