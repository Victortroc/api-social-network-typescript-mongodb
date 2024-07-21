import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
    postId: mongoose.Types.ObjectId;
    userId: string;
    content: string;
    mediaUrls: string[];
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    mediaUrls: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
