import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouter, privateRouter } from "./Router/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./Router/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRouter.map((route, index) => {
            const Layout = route.layout || Fragment;
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
            const Layout = route.layout || Fragment;
            const Page = route.component;

            return (
              <Route
                key={`private-${index}`}
                path={route.path}
                element={
                  <ProtectedRoute allowedRoles={route.role}>
                  <Layout>
                    <Page />
                  </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;