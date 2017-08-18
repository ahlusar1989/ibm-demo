import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const companySchema = new Schema({
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  company: { type: 'String', required: true },
  address: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Company', companySchema);
