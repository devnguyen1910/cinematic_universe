import mongoose, { Document, Schema } from 'mongoose';

export interface IShowtime extends Document {
  _id: string;
  movie: mongoose.Types.ObjectId;
  cinema: mongoose.Types.ObjectId;
  screen: {
    screenNumber: number;
    screenType: 'standard' | 'imax' | '3d' | 'dolby' | 'vip';
  };
  startTime: Date;
  endTime: Date;
  price: {
    adult: number;
    child: number;
    senior: number;
    student: number;
  };
  availableSeats: string[];
  bookedSeats: string[];
  language: string;
  subtitles?: string;
  format: '2d' | '3d' | 'imax' | 'dolby';
  isActive: boolean;
  specialOffers?: {
    name: string;
    description: string;
    discount: number;
    validUntil: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const showtimeSchema = new Schema<IShowtime>(
  {
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie is required'],
      index: true,
    },
    cinema: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: [true, 'Cinema is required'],
      index: true,
    },
    screen: {
      screenNumber: {
        type: Number,
        required: [true, 'Screen number is required'],
        min: 1,
      },
      screenType: {
        type: String,
        enum: ['standard', 'imax', '3d', 'dolby', 'vip'],
        required: [true, 'Screen type is required'],
      },
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
      index: true,
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    price: {
      adult: {
        type: Number,
        required: [true, 'Adult price is required'],
        min: [0, 'Price cannot be negative'],
      },
      child: {
        type: Number,
        required: [true, 'Child price is required'],
        min: [0, 'Price cannot be negative'],
      },
      senior: {
        type: Number,
        required: [true, 'Senior price is required'],
        min: [0, 'Price cannot be negative'],
      },
      student: {
        type: Number,
        required: [true, 'Student price is required'],
        min: [0, 'Price cannot be negative'],
      },
    },
    availableSeats: [{
      type: String,
      required: true,
    }],
    bookedSeats: [{
      type: String,
      default: [],
    }],
    language: {
      type: String,
      required: [true, 'Language is required'],
      trim: true,
      default: 'Vietnamese',
    },
    subtitles: {
      type: String,
      trim: true,
    },
    format: {
      type: String,
      enum: ['2d', '3d', 'imax', 'dolby'],
      required: [true, 'Format is required'],
      default: '2d',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    specialOffers: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      validUntil: {
        type: Date,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
showtimeSchema.index({ movie: 1, startTime: 1 });
showtimeSchema.index({ cinema: 1, startTime: 1 });
showtimeSchema.index({ startTime: 1, isActive: 1 });
showtimeSchema.index({ 'screen.screenNumber': 1, cinema: 1 });

// Pre-save validation
showtimeSchema.pre('save', function (next) {
  if (this.endTime <= this.startTime) {
    return next(new Error('End time must be after start time'));
  }
  
  // Check if showtime is in the past
  if (this.startTime < new Date()) {
    this.isActive = false;
  }
  
  next();
});

// Virtual for duration in minutes
showtimeSchema.virtual('durationMinutes').get(function () {
  return Math.floor((this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60));
});

// Virtual for available seat count
showtimeSchema.virtual('availableSeatCount').get(function () {
  return this.availableSeats.length;
});

// Virtual for booked seat count
showtimeSchema.virtual('bookedSeatCount').get(function () {
  return this.bookedSeats.length;
});

// Virtual for occupancy percentage
showtimeSchema.virtual('occupancyPercentage').get(function () {
  const totalSeats = this.availableSeats.length + this.bookedSeats.length;
  if (totalSeats === 0) return 0;
  return Math.round((this.bookedSeats.length / totalSeats) * 100);
});

// Method to book seats
showtimeSchema.methods.bookSeats = function (seats: string[]) {
  const unavailableSeats = seats.filter(seat => 
    !this.availableSeats.includes(seat) || this.bookedSeats.includes(seat)
  );
  
  if (unavailableSeats.length > 0) {
    throw new Error(`Seats ${unavailableSeats.join(', ')} are not available`);
  }
  
  // Move seats from available to booked
  seats.forEach(seat => {
    const index = this.availableSeats.indexOf(seat);
    if (index > -1) {
      this.availableSeats.splice(index, 1);
      this.bookedSeats.push(seat);
    }
  });
  
  return this.save();
};

// Method to release seats (for cancelled bookings)
showtimeSchema.methods.releaseSeats = function (seats: string[]) {
  seats.forEach(seat => {
    const index = this.bookedSeats.indexOf(seat);
    if (index > -1) {
      this.bookedSeats.splice(index, 1);
      this.availableSeats.push(seat);
    }
  });
  
  return this.save();
};

// Method to check if showtime is full
showtimeSchema.methods.isFull = function () {
  return this.availableSeats.length === 0;
};

// Method to get active special offers
showtimeSchema.methods.getActiveOffers = function () {
  const now = new Date();
  return this.specialOffers?.filter((offer: any) => offer.validUntil > now) || [];
};

export const Showtime = mongoose.model<IShowtime>('Showtime', showtimeSchema);