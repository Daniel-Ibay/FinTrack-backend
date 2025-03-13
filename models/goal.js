const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  category: { type: String }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

goalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
