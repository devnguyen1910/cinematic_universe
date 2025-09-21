import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  movie: mongoose.Types.ObjectId;
  cinema: mongoose.Types.ObjectId;
  showtime: mongoose.Types.ObjectId;
  seats: string[];
  totalAmount: number;
  concessions: {
    item: string;
    quantity: number;
    price: number;
  }[];
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  paymentId?: string;
  bookingCode: string;
  qrCode?: string;
  status: 'active' | 'cancelled' | 'used' | 'expired';
  bookingDate: Date;
  showDate: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
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
    },
    cinema: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: [true, 'Cinema is required'],
    },
    showtime: {
      type: Schema.Types.ObjectId,
      ref: 'Showtime',
      required: [true, 'Showtime is required'],
    },
    seats: [{
      type: String,
      required: true,
    }],
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    concessions: [{
      item: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    }],
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer'],
      required: [true, 'Payment method is required'],
    },
    paymentId: {
      type: String,
      trim: true,
    },
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    qrCode: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'used', 'expired'],
      default: 'active',
      index: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    showDate: {
      type: Date,
      required: [true, 'Show date is required'],
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // TTL index
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ showDate: 1, status: 1 });
bookingSchema.index({ bookingCode: 1 }, { unique: true });

// Pre-save middleware to generate booking code
bookingSchema.pre('save', function (next) {
  if (!this.bookingCode) {
    this.bookingCode = generateBookingCode();
  }
  
  // Set expiration time (30 minutes for pending payments)
  if (this.paymentStatus === 'pending' && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  }
  
  next();
});

// Method to generate booking code
function generateBookingCode(): string {
  const prefix = 'BK';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Virtual for total seats
bookingSchema.virtual('totalSeats').get(function () {
  return this.seats.length;
});

// Virtual for concessions total
bookingSchema.virtual('concessionsTotal').get(function () {
  return this.concessions.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);
});

// Method to check if booking is expired
bookingSchema.methods.isExpired = function () {
  return this.expiresAt && this.expiresAt < new Date();
};

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);