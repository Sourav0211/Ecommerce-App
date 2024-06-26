import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.send(401).send({
        success: false,
        message: "Name is required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (!existingCategory) {
      const category = await new categoryModel({
        name,
        slug: slugify(name),
      }).save();

      res.status(201).send({
        success: true,
        message: "Category created successfully",
        category,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "category already exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Error in category",
    });
  }
};

//update category controller
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Update Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Error in update",
    });
  }
};

//get all category

export const getCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (categories) {
      res.status(200).send({
        success: true,
        message: "Success in getting categories",
        categories,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error in getting categories",
        error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting categories",
      error,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (category) {
      res.status(200).send({
        success: true,
        message: "Success in getting category",
        category,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error in getting category",
        error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting category",
      error,
    });
  }
};

//delete category controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting category",
    });
  }
};
