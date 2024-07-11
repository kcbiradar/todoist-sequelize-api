const express = require("express");
const cors= require('cors')
const sequelize = require("./app/config/config.db");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello world from MountBlue");
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors())

const userRouter = require("./app/routes/user.route");
const projectRouter = require("./app/routes/project.route");
const sectionRouter = require("./app/routes/section.route");
const taskRouter = require("./app/routes/task.route");
const commentRouter = require("./app/routes/comment.route");
const labelRouter = require("./app/routes/label.route");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/section", sectionRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/label", labelRouter);

const PORT = 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database connection has been established successfully.`);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect make the connection", error);
  });
