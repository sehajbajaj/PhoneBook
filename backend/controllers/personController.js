const Person = require("../models/PersonModel");
const mongoose = require("mongoose");

// get all persons
const getPersons = async (req, res) => {
  const persons = await Person.find({}).sort({ createdAt: -1 });

  res.status(200).json(persons);
};

// get a single person
const getPerson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such person" });
  }

  const person = await Person.findById(id);

  if (!person) {
    return res.status(404).json({ error: "No such person" });
  }
  res.status(200).json(person);
};

// create new person
const createPerson = async (req, res) => {
  const { name, number, location } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!number) {
    emptyFields.push("number");
  }
  if (!location) {
    emptyFields.push("location");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  if (number.length < 3 || number.length > 10) {
    return res.status(400).json({
      error:
        "Invalid Phone Number. The phone number must be atleast 3 digits and atmost 10 digits long",
    });
  }

  // add doc to db
  try {
    const person = await Person.create({ name, number, location });
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a person
const deletePerson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such person" });
  }

  const person = await Person.findOneAndDelete({ _id: id });

  if (!person) {
    return res.status(404).json({ error: "No such person" });
  }
  res.status(200).json(person);
};

// update a person
const updatePerson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such person" });
  }

  const person = await Person.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!person) {
    return res.status(404).json({ error: "No such person" });
  }
  res.status(200).json(person);
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
  updatePerson,
};
