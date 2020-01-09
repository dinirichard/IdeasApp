import * as mongoose from 'mongoose';

// Uses javascript types and style
export const IdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

export interface Idea extends mongoose.Document {
    id: string;
    description: string;
}