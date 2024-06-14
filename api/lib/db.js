const mongoose = require("mongoose");

// Define the schema for a note
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: "Anonymous"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1h" // Automatically delete documents after 1 hour
  }
});

// Create the Note model using the schema
const Note = mongoose.model("Note", noteSchema);

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Replace 'your_database_url' with your actual MongoDB connection string
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

// Export the Note model and the connectDB function
module.exports = {
  Note,
  connectDB
};
