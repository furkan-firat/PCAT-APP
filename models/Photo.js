import mongoose from "mongoose";
import { Schema } from "mongoose";

// Create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

// Create a photo
//const pic = new Photo({ title: "Photo 2", description: "Desc 2" });

// read the photos
// pic
//   .save()
//   .then(() => {
//     console.log("Photo saved successfully");

//     // Fetch all photos using find
//     return Photo.find({});
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//update photo
// Photo.findByIdAndUpdate("659c633f8b93f4a565ecee01", {
//   title: "Photo1 Title updated",
//   description: "Desc1 updated",
// }).then((data) => {
//   console.log(data);
// });

//delete a photo
// Photo.findByIdAndDelete("659c6abe78839d5e3ea5ef4d").then((data) => {
//   console.log("Photo deleted");
// });

export default Photo;
