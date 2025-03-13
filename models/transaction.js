const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true }, // 'income' para ingresos, 'expense' para pérdidas
  category: { type: String }, // opcional: puedes guardar una categoría para cada transacción
  date: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Referencia al usuario
});

transactionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
