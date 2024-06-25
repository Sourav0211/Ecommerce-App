import React from "react";
import Layout from "../components/Layout/layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth({
    user: null,
    token: "",
  });

  return (
    <Layout>
      <h2>Homepage</h2>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
