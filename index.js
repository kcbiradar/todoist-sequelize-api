const express = require("express");
const sequelize = require("./app/config/config.db");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello world from MountBlue");
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRouter = require("./app/routes/user.route");
const projectRouter = require("./app/routes/project.route");
const sectionRouter = require("./app/routes/section.route");
const taskRouter = require("./app/routes/task.route");
const commentRouter = require("./app/routes/comment.route");

app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/section", sectionRouter);
app.use("/api/task", taskRouter);
app.use("/api/comment", commentRouter);

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
