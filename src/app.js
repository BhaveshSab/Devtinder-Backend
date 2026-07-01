const cors = require("cors");
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

//* Middleware to parse incoming JSON requests and cookies
const allowedOrigins = [
  "https://devtinder-web-14dc.vercel.app",
  "https://bhaveshsab.github.io",
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches any in our list or includes 'localhost' / 'github.io' / 'vercel.app'
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.startsWith("http://localhost:") || 
                      origin.includes("github.io") || 
                      origin.includes("vercel.app");
                      
    if (!isAllowed) {
      return callback(new Error("CORS policy: This origin is not allowed."), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//* Routes for different API endpoints
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userConnection");
const searchRouter = require("./routes/search");

//* Using routers for handling different routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", searchRouter);

//* Connect to the database and start the server once connected
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  })
  .catch((err) => console.error(err));