import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    username: string;
    content: string;
    mediaUrls: string[];
    createdAt: Date;
}

const PostSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    content: { type: String, required: false },
    mediaUrls: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>("Post", PostSchema);
