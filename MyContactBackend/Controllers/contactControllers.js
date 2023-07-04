const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {

    console.log('User id' + req.user.id);
    const contact = await Contact.find({ user_id: req.user.id});
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json({contact: contact});
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User is not authorized to update the contact');
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.status(200).json({contact: updatedContact});
})

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact =  await Contact.create({
     name,
     email,
     phone,
     user_id: req.user.id
    });
    res.status(200).json(contact);
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  });

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User is not authorized to delete the contact');
    }

    await Contact.deleteOne();
    res.status(200).json({contact: contact});
})

module.exports = {getContact, updateContact, createContact, deleteContact, getContacts};