const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let NoteSchema = new Schema({

  _articleId: {
    type: Schema.Types.ObjectId, 
    ref: "Article"
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  
  body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;