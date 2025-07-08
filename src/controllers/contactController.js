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

  const database = await mongodb.getDb();
  const response = await database.collection("contacts").insertOne(contact);

  if (!response.acknowledged) {
    return res.status(500).json({ message: "Error creating contact" });
  } else {
    res.status(201).json({ message: "Contact created", data: contact });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tag=['Contacts']
  const contact = {
    id: new ObjectId(req.params.id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
  };

  const database = await mongodb.getDb();
  const response = await database
    .collection("contacts")
    .replaceOne((_id = contact.id), contact);

  if (!response.acknowledged) {
    return res.status(500).json({ message: "Error creating contact" });
  } else {
    res.status(201).json({ message: "Contact Updated", data: contact });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tag=['Contacts']
  const id = new ObjectId(req.params.id);

  const database = await mongodb.getDb();
  const response = await database
    .collection("contacts")
    .remove((_id = id), true);

  if (!response.acknowledged) {
    return res.status(500).json({ message: "Error creating contact" });
  } else {
    res.status(201).json({ message: "Contact created", data: contact });
  }
};

module.exports = {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
