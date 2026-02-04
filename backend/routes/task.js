const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Task = require('../models/tasks'); 

// GET
router.get('/', auth, async (req, res) => {
  try {
    const { search } = req.query; 
    let query = { user: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// CREATE task
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// DELETE task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;