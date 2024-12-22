const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser, getUserByEmail } = require("../models/userModel");

const SECRET_KEY = "clave_secreta";

// Registrar un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await registerUser({
      email,
      password: hashedPassword,
      rol,
      lenguage,
    });

    res.status(201).json({ message: "Usuario registrado exitosamente", newUser });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Obtener usuario autenticado
const getUser = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

module.exports = { createUser, loginUser, getUser };
