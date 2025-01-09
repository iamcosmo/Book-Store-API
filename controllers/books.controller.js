import BookModel from "../models/books.models.js";

export const addBook = async (req, res) => {
  try {
    const { user,book, customData } = req;

    if (customData.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    //const userId = user._id;
    console.log('Book: ',book);
    
    const newBook = await BookModel.create({
      title: book.title,
      topic: book.topic,
      summary: book.summary,
    });

    console.log('New Book: ',newBook);
    

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ success: false, message: "Error creating book" });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await BookModel.find();
    res.status(200).json({book,message: "Books Store View" });
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ success: false, message: "Error retrieving books" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { user,book, customData } = req;

    if (customData.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const userId = user._id;

    const bookId = req.params.id;
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, {
      title: book.title,
      topic: book.topic,
      summary: book.summary,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ success: false, message: "Error updating book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { user,book, customData } = req;

    if (customData.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    //const userId = user._id;

    const bookId = req.params.id;
    await BookModel.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ success: false, message: "Error deleting book" });
  }
};
