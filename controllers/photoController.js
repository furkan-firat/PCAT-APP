import Photo from "../models/Photo.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAllPhotos = async (req, res) => {
  // const photos = await Photo.find({}).sort({ dateCreated: -1 });
  // res.render("index", {
  //   photos,
  // });

  const currentPage = req.query.page || 1;

  const photosPerPage = 3;

  const totalPhotos = await Photo.countDocuments();

  const photos = await Photo.find({})
    .sort({ dateCreated: -1 })
    .skip((currentPage - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render("index", {
    photos: photos,
    currentPage: currentPage,
    totalPageNumber: Math.ceil(totalPhotos / photosPerPage),
  });
};

export const getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
};

export const createPhoto = async (req, res) => {
  const imagePath = "uploads/" + req.file.filename;
  await Photo.create({
    ...req.body,
    image: imagePath,
  });
  res.redirect("/");
};

export const updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

export const deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deleteImagePath = __dirname + "/../public/" + photo.image;
  fs.unlinkSync(deleteImagePath);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
