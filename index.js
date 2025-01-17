const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const customerRouter = require("./routes/userRoute");
const aboutRouter = require("./routes/aboutRoute");
const heroRouter = require("./routes/heroRoute");
const headerRoute = require("./routes/headerRoute");
const servicesRoute = require("./routes/servicesRoute");
const portfolioRoute = require("./routes/portfolioRoute");
const bannerRoute = require("./routes/bannerRoute");
const colorsRoute = require("./routes/colorsRoute");
const loginRoute = require("./routes/loginRoute");
const adminRoute = require("./routes/adminRoute");
const sectionOrderingRoute = require("./routes/sectionOrderingRoute");
const createSection = require("./routes/createSection");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/upload", express.static("upload"));

const PORT = process.env.PORT || 5001;
const dbURL = process.env.dbURL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`server is listening on the ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Error:-", err);
  });

// All the routers/API's list
app.use("/api/cutomers", customerRouter);
app.use("/api/getAbout", aboutRouter);
app.use("/api/getHero", heroRouter);
app.use("/api/getHeader", headerRoute);
app.use("/api/getServices", servicesRoute);
app.use("/api/getPortfolio", portfolioRoute);
app.use("/api/getBanner", bannerRoute);
app.use("/api/getColors", colorsRoute);
app.use("/api/user", loginRoute);
app.use("/api/admin", adminRoute);
app.use("/api/sectionOrdering", sectionOrderingRoute);
app.use("/api/createSection", createSection);
