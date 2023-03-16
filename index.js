import express from "express";
import { nanoid } from "nanoid";
const app = express();
const port = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

//Reference: https://stackabuse.com/building-a-rest-api-with-node-and-express/cd

var users = [
  { email: "abc@abc.ca", firstName: "ABC", id: "5abf6783" },
  { email: "xyz@xyz.ca", firstName: "XYZ", id: "5abf674563" },
];

app.get("/", (req, res) => {
  res.send(
    "Harsh Kamlesbhai Shah (B00899573) - Welcome to Tutorial 5"
  );
});

app.get("/users", (req, res) => {
  console.log(users);
  res.json({
    message: "Users retrieved",
    success: true,
    users: users,
  });
});

app.put("/update/:id", (req, res) => {
  console.log(req);
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
      success: false,
    });
  } else {
    Object.assign(user, req.body);
    res.json({
      message: "User updated",
      success: true,
    });
  }
});

app.post("/add", (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({
      message: "Request body is missing",
      success: false,
    });
  }
  const { email, firstName } = req.body;
  if (!email || !firstName) {
    res.status(400).json({
      message: "Email and firstName are required fields",
      success: false,
    });
  } else {
    // Reference : https://www.makeuseof.com/node-unique-ids-generate/
    const userId = nanoid();
    const newUser = { email, firstName, id: userId };
    users.push(newUser);
    res.status(201).json({ message: "User added", success: true });
  }
});

app.get("/user/:id", (req, res) => {
  console.log(req.params)
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    user: {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
    },
  });
});

app.listen(port, () => console.log(`Tutorial 5 is listening on port ${port}!`));
