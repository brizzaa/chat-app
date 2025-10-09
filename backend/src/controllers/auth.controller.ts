import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import cloudinary from "../lib/cloudinary";

// handling signup
export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    // hash passw con bcrypt
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "tutti i campi devono essere compilati",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "la password deve essere almeno di 6 caratteri",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email già utilizzata",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "dati utente non validi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "errore server" + error,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "credenziali non valide",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "credenziali non valide",
      });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "errore server",
    });
  }
};
export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "utente disconnesso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "errore server",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "utente non autorizzato",
      });
    }
    if (!profilePic) {
      return res.status(400).json({
        message: "immagine del profilo è obbligatorio",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profilePics",
    });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("errore nel server" + error);
    res.status(500).json({
      message: "errore server",
    });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "errore server",
    });
  }
};
