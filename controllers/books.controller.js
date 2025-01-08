import BookModel from "../models/books.models";

export const addBook = async (req, res) => {
  try {
    const { title, topic, summary } = req.body;
    const userId = req.user._id; 
    const newBook = await BookModel.create({
      title: title,
      topic: topic,
      summary: summary,
      user: userId,
    });
    

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

export const getBook = async (req,res)=>{
  try {
    const book = await BookModel.find();
    res.status(200).json({
      success: true,
      message: "All books retrieved successfully",
      book: book,
    });
   
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ success: false, message: "Error retrieving books" });
  }

}