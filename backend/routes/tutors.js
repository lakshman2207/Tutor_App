const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const tutor = new Tutor({
    name: req.body.name,
    subject: req.body.subject,
    experience: req.body.experience,
    rate: req.body.rate,
    email: req.body.email
  });

  try {
    const newTutor = await tutor.save();
    res.status(201).json(newTutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    tutor.name = req.body.name || tutor.name;
    tutor.subject = req.body.subject || tutor.subject;
    tutor.experience = req.body.experience || tutor.experience;
    tutor.rate = req.body.rate || tutor.rate;
    tutor.email = req.body.email || tutor.email;

    const updatedTutor = await tutor.save();
    res.json(updatedTutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    await tutor.deleteOne();
    res.json({ message: 'Tutor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;