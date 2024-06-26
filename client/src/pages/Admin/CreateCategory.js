import React from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h2>Create Category</h2>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
