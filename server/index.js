const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authenticateToken = require("./middleware/authMiddleware");
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// routes
app.use("/",authRoutes);
app.get("/", (req,res)=>{
    res.send("Backend is running");
});

app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
  });

app.listen(PORT , ()=>{
    console.log(`Server is runnning on http://localhost:${PORT}`);
});