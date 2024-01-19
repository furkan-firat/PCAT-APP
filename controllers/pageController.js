import Photo from "../models/Photo.js";

export const getAboutPage = (req, res) => {
  res.render("about");
};

export const getAddPhotoPage = (req, res) => {
  res.render("addPhoto");
};

export const getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", {
    photo,
  });
};
