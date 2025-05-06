import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import session from "express-session";
import passport from "../backend/config/passport.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(cookieParser());
// Middleware for sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true,
      sameSite: 'strict',
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import courseRoutes from "./routes/course.routes.js";
import paymentRoute from "./routes/payment.routes.js";

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes)
app.use("/api/course", courseRoutes)
app.use("/api/payment", paymentRoute)

app.listen(PORT, () => {    
  console.log(`Server is running on http://localhost:${PORT}`);
});