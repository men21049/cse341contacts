const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;

const getContact = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const contacts = await database
      .collection("contacts")
      .find()
      .toArray()
      .then((data) => {
        console.log("Contacts retrieved:", data.length);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
      });
    return contacts;
  } catch (error) {
    console.error("Error in getContact:", error);
    res
      .status(500)
      .json({ message: "Error retrieving contacts", error: error.message });
  }
};

const getContactById = async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const database = await mongodb.getDb();
    const contacts = await database
      .collection("contacts")
      .find({ _id: id })
      .toArray()
      .then((data) => {
        console.log("Contacts retrieved:", data.length);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
      });
    return contacts;
  } catch (error) {
    console.error("Error in getContact:", error);
    res
      .status(500)
      .json({ message: "Error retrieving contacts", error: error.message });
  }
};

const createContact = (req, res) => {
  const newContact = req.body;
  res.status(201).json({ message: "Contact created", data: newContact });
};

const updateContact = (req, res) => {
  const id = req.params.id;
  const updatedContact = req.body;
  res.status(200).json({
    message: `Contact with ID: ${id} updated`,
    data: updatedContact,
  });
};

const deleteContact = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Contact with ID: ${id} deleted` });
};

module.exports = {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
