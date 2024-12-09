import User from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).send("Missing required fields");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .send({ email: newUser.email, username: newUser.username });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    res.status(200).send("Successful login");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const userController = {
  registerUser,
  loginUser,
  getUsers,
};

export default userController;
