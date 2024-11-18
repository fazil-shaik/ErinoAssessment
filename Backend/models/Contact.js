// import { Schema, model } from 'mongoose';

// const ContactSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   company: { type: String },
//   jobTitle: { type: String },
// }, { timestamps: true });

// export default model('Contact', ContactSchema);

// File: models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;