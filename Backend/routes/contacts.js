// // import { Router } from 'express';
// // const router = Router();
// // import Contact from '../models/Contact.js';

// // // Get all contacts
// // router.get('/', async (req, res) => {
// //   try {
// //     const page = parseInt(req.query.page) || 1;
// //     const limit = 10;
// //     const sort = req.query.sort || 'lastName';
// //     const order = req.query.order === 'desc' ? -1 : 1;

// //     const totalContacts = await countDocuments();
// //     const totalPages = Math.ceil(totalContacts / limit);

// //     const contacts = await find()
// //       .sort({ [sort]: order })
// //       .skip((page - 1) * limit)
// //       .limit(limit);

// //     res.json({ contacts, totalPages });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Add a new contact
// // router.post('/', async (req, res) => {
// //   const contact = new Contact(req.body);
// //   try {
// //     const newContact = await contact.save();
// //     res.status(201).json(newContact);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // Update a contact
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const updatedContact = await findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.json(updatedContact);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // Delete a contact
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Contact deleted' });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // export default router;

// // File: routes/contacts.js
// import express from 'express';
// import Contact from '../models/Contact.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const sort = req.query.sort || 'lastName';
//     const order = req.query.order === 'desc' ? -1 : 1;
//     const skip = (page - 1) * limit;

//     const contacts = await Contact.find()
//       .sort({ [sort]: order })
//       .skip(skip)
//       .limit(limit);

//     const totalCount = await Contact.estimatedDocumentCount();

//     res.json({
//       contacts,
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit)
//     });
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     res.status(500).json({ message: 'Error fetching contacts', error: error.message });
//   }
// });

// export default router;
// File: routes/contacts.js
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || 'lastName';
    const order = req.query.order === 'desc' ? -1 : 1;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit);

    const totalCount = await Contact.estimatedDocumentCount();

    res.json({
      contacts,
      totalCount,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Add a new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding new contact:', error);
    res.status(400).json({ message: 'Error adding new contact', error: error.message });
  }
});

// Update a contact
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ message: 'Error updating contact', error: error.message });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

export default router;