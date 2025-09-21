import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  movie: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  isVerified: boolean;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  flagged: boolean;
  flagReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie is required'],
      index: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating cannot exceed 10'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    dislikes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    flagged: {
      type: Boolean,
      default: false,
      index: true,
    },
    flagReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
reviewSchema.index({ user: 1, movie: 1 }, { unique: true }); // One review per user per movie
reviewSchema.index({ movie: 1, rating: -1 });
reviewSchema.index({ createdAt: -1 });

// Virtual for like count
reviewSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

// Virtual for dislike count
reviewSchema.virtual('dislikeCount').get(function () {
  return this.dislikes.length;
});

// Virtual for net score
reviewSchema.virtual('netScore').get(function () {
  return this.likes.length - this.dislikes.length;
});

export const Review = mongoose.model<IReview>('Review', reviewSchema);