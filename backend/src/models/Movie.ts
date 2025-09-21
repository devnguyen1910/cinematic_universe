import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  _id: string;
  tmdbId: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: Date;
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  originalLanguage: string;
  status: 'rumored' | 'planned' | 'in_production' | 'post_production' | 'released' | 'canceled';
  tagline?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdbId?: string;
  productionCompanies: Array<{
    id: number;
    name: string;
    logoPath?: string;
    originCountry: string;
  }>;
  productionCountries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spokenLanguages: Array<{
    iso_639_1: string;
    name: string;
  }>;
  videos: Array<{
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    publishedAt: Date;
  }>;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profilePath?: string;
      order: number;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
      profilePath?: string;
    }>;
  };
  // Custom fields for our app
  aiSynopsis?: string;
  isActive: boolean;
  showingStatus: 'now_showing' | 'coming_soon' | 'ended';
  viewCount: number;
  rating: number;
  totalReviews: number;
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new Schema<IMovie>(
  {
    tmdbId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    originalTitle: {
      type: String,
      required: true,
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      maxlength: [2000, 'Overview cannot exceed 2000 characters'],
    },
    posterPath: {
      type: String,
      required: true,
    },
    backdropPath: String,
    releaseDate: {
      type: Date,
      required: true,
      index: true,
    },
    genres: [{
      id: { type: Number, required: true },
      name: { type: String, required: true, trim: true },
    }],
    runtime: {
      type: Number,
      min: [0, 'Runtime cannot be negative'],
    },
    voteAverage: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    voteCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    popularity: {
      type: Number,
      min: 0,
      default: 0,
    },
    adult: {
      type: Boolean,
      default: false,
    },
    video: {
      type: Boolean,
      default: false,
    },
    originalLanguage: {
      type: String,
      required: true,
      maxlength: 10,
    },
    status: {
      type: String,
      enum: ['rumored', 'planned', 'in_production', 'post_production', 'released', 'canceled'],
      default: 'released',
    },
    tagline: String,
    budget: {
      type: Number,
      min: 0,
    },
    revenue: {
      type: Number,
      min: 0,
    },
    homepage: String,
    imdbId: String,
    productionCompanies: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      logoPath: String,
      originCountry: String,
    }],
    productionCountries: [{
      iso_3166_1: { type: String, required: true },
      name: { type: String, required: true },
    }],
    spokenLanguages: [{
      iso_639_1: { type: String, required: true },
      name: { type: String, required: true },
    }],
    videos: [{
      id: { type: String, required: true },
      key: { type: String, required: true },
      name: { type: String, required: true },
      site: { type: String, required: true },
      size: { type: Number, required: true },
      type: { type: String, required: true },
      official: { type: Boolean, default: false },
      publishedAt: { type: Date, required: true },
    }],
    credits: {
      cast: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        character: { type: String, required: true },
        profilePath: String,
        order: { type: Number, required: true },
      }],
      crew: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        job: { type: String, required: true },
        department: { type: String, required: true },
        profilePath: String,
      }],
    },
    aiSynopsis: String,
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    showingStatus: {
      type: String,
      enum: ['now_showing', 'coming_soon', 'ended'],
      default: 'now_showing',
      index: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
movieSchema.index({ title: 'text', overview: 'text' });
movieSchema.index({ 'genres.name': 1 });
movieSchema.index({ voteAverage: -1 });
movieSchema.index({ popularity: -1 });
movieSchema.index({ releaseDate: -1 });

// Virtual for genre names
movieSchema.virtual('genreNames').get(function () {
  return this.genres.map(genre => genre.name);
});

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);