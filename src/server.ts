import app from "./main";

app.listen(app.get("port"), () => {
  console.log("User Management API is running on port:", app.get("port"));
});
