import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (data.success) {
        toast.success(`category updated to ${updatedName}`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h2>Manage Category</h2>
          <div className="p-3">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            ></CategoryForm>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td> {c.name}</td>
                  <td>
                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          visible={visible}
        >
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
