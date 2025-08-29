import User from  "../models/user.model.js"; 
import bcrypt from  "bcryptjs";
import jwt from  "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
     res.status(200).json({ messageL: "Logged out successfully"});
  } catch (err) {
     res.status(500).json({ message: "Server error", error: err.message});
  }
};

const getProfile = async (req, res) => {
    try{
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
    } catch (err){
        res.status(500).json({ message: "Server error", error: err.message});
    }
};

const getUserRole = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        const user = await User.findById(id).select('role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ role: user.role });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Error fetching user role', error: err.message });
    }
};
export { register, login, logout, getProfile, getUserRole };