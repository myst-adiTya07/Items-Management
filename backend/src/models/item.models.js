import mongoose, {Schema} from "mongoose";

const ItemSchema = new Schema({
  name: String,
  category: {
    type:String,
    required : true,
    set: (val) => val.trim().toLowerCase(),
  },
},
{
  timestamps: true
});

export const Item = mongoose.model("Item", ItemSchema);
