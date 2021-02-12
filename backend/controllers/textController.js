import fs from 'fs';
import asyncHandler from 'express-async-handler';

const getText = asyncHandler(async (req, res) => {
  try {
    const about = fs.readFileSync('text/about.txt');
    const privacy = fs.readFileSync('text/privacy.txt');
    const openingHours = fs.readFileSync('text/openinghours.txt');
    const home = fs.readFileSync('text/home.txt');
    const data = {
      home: home.toString(),
      about: about.toString(),
      privacy: privacy.toString(),
      openingHours: openingHours.toString(),
    };
    res.status(200).json(data);
  } catch {
    res.status(500);
    throw new Error('Could not read files');
  }
});

const updateText = asyncHandler(async (req, res) => {
  try {
    const { home, about, privacy, openingHours } = req.body;
    fs.writeFileSync('text/home.txt', home);
    fs.writeFileSync('text/about.txt', about);
    fs.writeFileSync('text/privacy.txt', privacy);
    fs.writeFileSync('text/openinghours.txt', openingHours);
    res.status(201).json({ home, about, privacy, openingHours });
  } catch {
    res.status(500);
    throw new Error('Could not write to files');
  }
});

export { getText, updateText };
