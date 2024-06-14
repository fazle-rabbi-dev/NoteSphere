const express = require("express");
const { Note } = require("./lib/db.js");
const morgan = require("morgan");
const { formatMongoDate } = require("./lib/utils.js");

// ==========
const cron = require("node-cron");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const fetchDataAndCache = async () => {
  console.log("Fetching and caching ...");
  try {
    const notes = await Note.find({});
    console.log({ FETCHED_FOR_CACH: notes });
    cache.set("notes", notes);
  } catch (error) {
    console.error("Error fetching notes for cache:", error);
  }
};

// Schedule the fetch job to run every 10 minutes
cron.schedule("*/10 * * * *", fetchDataAndCache);
// ==========

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms"
  )
);

// Home Page
app.get("/", (req, res) => {
  res.render("index", {
    title: "NoteSphere - Create & Share Note Globally"
  });
});

// Note Page
app.get("/notes", async (req, res) => {
  /*let allNotes = await Note.find({})
    .limit(10)
    .sort({
      createdAt: -1
    });
  allNotes.reverse();
  
  allNotes = allNotes.map(note => {
    note.date = formatMongoDate(note.createdAt)
    return note;
  })*/

  const notes = cache.get("notes");

  if (!notes) {
    return res.status(400).send("Error");
  }

  console.log({ notes });

  res.render("note.ejs", {
    title: "Notes",
    allNotes: notes?.length === 0 ? null : notes
  });
});

// Sanitize User Input
app.post("/notes", async (req, res) => {
  const { title, desc, author } = req.body;

  if (!title.trim() || !desc.trim()) {
    return res.render("error.ejs", {
      errorMessage: "Uh-oh! invalid note title or description."
    });
  }

  const createdNote = await Note.create({
    title,
    description: desc,
    author
  });

  console.log({ createdNote });

  res.redirect("/notes");
});

module.exports = {
  app,
  fetchDataAndCache
};
