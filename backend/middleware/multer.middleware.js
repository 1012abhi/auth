import multer from "multer";
import crypto from "crypto"; // crypto module ko import kiya hai random name generate karne ke liye
import Path from "path"; // path module ko import kiya hai file ka extension lene ke liye
// ham yaha par diskstorage use kr rahe hai memorystorage isliye nahi kr rahe hai kyuki memory jyada bada data aa gya to problem ho jayegi

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads"); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, function (err, name) {
        const fn = name.toString("hex") + Path.extname(file.originalname);
        cb(null, fn);
      })
    }
  })
  
  // const fileFilter = (req, file, cb) => {
  //   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  //   if (allowedTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false);
  //   }
  // };
  
export const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }) // 5 MB limit;