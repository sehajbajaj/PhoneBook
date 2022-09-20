const express = require("express");
const Person = require("../models/PersonModel");
const {
  createPerson,
  getPersons,
  getPerson,
  deletePerson,
  updatePerson,
} = require("../controllers/personController");
const router = express.Router();

// GET all persons
router.get("/", getPersons);

// GET a single person
router.get("/:id", getPerson);

// POST a new person
router.post("/", createPerson);

// DELETE a person
router.delete("/:id", deletePerson);

// UPDATE a person
router.patch("/:id", updatePerson);

module.exports = router;
