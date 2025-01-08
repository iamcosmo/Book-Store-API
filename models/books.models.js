import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: [String],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
 
},{
  timestamps:true
});

const BookModel = mongoose.model("Books", bookSchema);

export default BookModel;