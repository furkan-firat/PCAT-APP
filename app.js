import express from "express"; // expressjs kullanmak için import ettik
import mongoose from "mongoose"; //// mongoose kullanmak için import ettik. Node.js için bir MongoDB nesne modelleme aracıdır. Schemalar oluşturuyoruz onları kullanarak collections ve datas oluşturuyoruz.
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import ejs from "ejs"; // template engine. html içinde js yazıyoruz
import bodyParser from "body-parser"; //req.body için gerekli yoksa defaultda undefined dönüyor
import multer from "multer"; // req.body için gerekli yoksa defaultda undefined dönüyor
import methodOverride from "method-override";
import dotenv from "dotenv";
dotenv.config();

import {
  createPhoto,
  deletePhoto,
  getAllPhotos,
  getPhoto,
  updatePhoto,
} from "./controllers/photoController.js";
import {
  getAboutPage,
  getAddPhotoPage,
  getEditPage,
} from "./controllers/pageController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/uploads";

    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadDir);
    });
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }); // req.body için gerekli yoksa defaultda undefined dönüyor,

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//connect DB
mongoose
  .connect(process.env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

//template engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);
app.use(express.static(path.join(__dirname, "public")));
// statik dosyalarla çalışmak için
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application

//ROUTES
app.get("/", getAllPhotos);

app.get("/photos/:id", getPhoto);

app.post("/photos", upload.single("image"), createPhoto);

app.put("/photos/:id", updatePhoto);

app.delete("/photos/:id", deletePhoto);

app.get("/photos/edit/:id", getEditPage);

app.get("/about", getAboutPage);

app.get("/addPhoto", getAddPhotoPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
