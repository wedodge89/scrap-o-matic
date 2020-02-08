const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
    type: String,
    required: true
    },
    url: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;