import request from "supertest";
import app from "../index.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserDataModel from "../models/users.models.js";

describe("Book Store API", () => {
  let token;
  let userId;

  // Insert a test user before the test
  beforeAll(async () => {
    const testUser = new UserDataModel({
      username: "testuser",
      password: "password123",
      role: "Admin",
    });

    const savedUser = await testUser.save();
    userId = savedUser._id;
    token = jwt.sign({ _id: userId }, process.env.JWT_SECRET);
  });

  // ✅ Test for GET /books
  it("should fetch all books from the /books endpoint", async () => {
    const response = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // ✅ Test for POST /books
  it("should add a new book via the /books endpoint", async () => {
    const newBook = {
      title: "The Great Gatsby",
      topic: "Fiction",
      summary: "A story about the American Dream",
    };

    const response = await request(app)
      .post(`/books/?x-user-id=${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Book created successfully");
    expect(response.body).toHaveProperty("book");
    expect(response.body.book).toMatchObject(newBook);
  });
  // Clean up the specific test user after tests
  afterAll(async () => {
    await UserDataModel.findByIdAndDelete(userId);
    await mongoose.connection.close();
  });
});
