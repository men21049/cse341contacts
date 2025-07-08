const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;

const getContact = async (req, res) => {
  //#swagger.tag=['Contacts']
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
  //#swagger.tag=['Contacts']
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
      })
      .catch((error) => {
        res.status(404).json({ message: "Contact not found" });
      });
    return contacts;
  } catch (error) {
    console.error("Error in getContact:", error);
    res
      .status(500)
      .json({ message: "Error retrieving contacts", error: error.message });
  }
};

const createContact = async (req, res) => {
  //#swagger.tag=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
  };
  try {
    const database = await mongodb.getDb();
    const response = await database.collection("contacts").insertOne(contact);

    if (response.acknowledged) {
      res.status(204).json({ message: "Contact created", data: contact });
    }
  } catch (error) {
    console.error("Error in createContact:", error);
    return res
      .status(500)
      .json({ message: "Error creating contact", error: error.message });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tag=['Contacts']
  const id = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
  };

  try {
    const database = await mongodb.getDb();
    const response = await database
      .collection("contacts")
      .replaceOne({ _id: id }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error in updateContact:", error);
    return res
      .status(500)
      .json({ message: "Error updating contact", error: error.message });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tag=['Contacts']
  const id = new ObjectId(req.params.id);

  try {
    const database = await mongodb.getDb();
    const response = await database
      .collection("contacts")
      .deleteOne({ _id: id }, true);

    if (response.deletedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: "Contact not found" });
  } catch (error) {
    console.error("Error in deleteContact:", error);
    return res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
};

module.exports = {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
