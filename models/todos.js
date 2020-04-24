var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Mentor"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
