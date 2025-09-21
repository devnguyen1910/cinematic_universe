import mongoose, { Document, Schema } from 'mongoose';

export interface ICinema extends Document {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  phone: string;
  email: string;
  website?: string;
  amenities: string[];
  screens: {
    screenNumber: number;
    name: string;
    capacity: number;
    screenType: 'standard' | 'imax' | '3d' | 'dolby' | 'vip';
    seatLayout: {
      rows: string[];
      seatsPerRow: number[];
    };
  }[];
  facilities: {
    parking: boolean;
    restaurant: boolean;
    arcade: boolean;
    accessibility: boolean;
  };
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  isActive: boolean;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const cinemaSchema = new Schema<ICinema>(
  {
    name: {
      type: String,
      required: [true, 'Cinema name is required'],
      trim: true,
      maxlength: [100, 'Cinema name cannot exceed 100 characters'],
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },
      zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        default: 'Vietnam',
      },
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (coordinates: number[]) {
            return coordinates.length === 2;
          },
          message: 'Coordinates must be an array of [longitude, latitude]',
        },
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid website URL'],
    },
    amenities: [{
      type: String,
      trim: true,
    }],
    screens: [{
      screenNumber: {
        type: Number,
        required: true,
        min: 1,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      capacity: {
        type: Number,
        required: true,
        min: 1,
      },
      screenType: {
        type: String,
        enum: ['standard', 'imax', '3d', 'dolby', 'vip'],
        default: 'standard',
      },
      seatLayout: {
        rows: [{
          type: String,
          required: true,
        }],
        seatsPerRow: [{
          type: Number,
          required: true,
          min: 1,
        }],
      },
    }],
    facilities: {
      parking: {
        type: Boolean,
        default: false,
      },
      restaurant: {
        type: Boolean,
        default: false,
      },
      arcade: {
        type: Boolean,
        default: false,
      },
      accessibility: {
        type: Boolean,
        default: false,
      },
    },
    operatingHours: {
      type: Map,
      of: {
        open: {
          type: String,
          required: true,
          match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format'],
        },
        close: {
          type: String,
          required: true,
          match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format'],
        },
        closed: {
          type: Boolean,
          default: false,
        },
      },
      default: {
        monday: { open: '10:00', close: '23:00' },
        tuesday: { open: '10:00', close: '23:00' },
        wednesday: { open: '10:00', close: '23:00' },
        thursday: { open: '10:00', close: '23:00' },
        friday: { open: '10:00', close: '24:00' },
        saturday: { open: '09:00', close: '24:00' },
        sunday: { open: '09:00', close: '23:00' },
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
cinemaSchema.index({ location: '2dsphere' }); // Geospatial index
cinemaSchema.index({ 'address.city': 1, isActive: 1 });
cinemaSchema.index({ name: 'text', 'address.city': 'text' });
cinemaSchema.index({ rating: -1 });

// Virtual for total screens
cinemaSchema.virtual('totalScreens').get(function () {
  return this.screens.length;
});

// Virtual for total capacity
cinemaSchema.virtual('totalCapacity').get(function () {
  return this.screens.reduce((total, screen) => total + screen.capacity, 0);
});

// Virtual for full address
cinemaSchema.virtual('fullAddress').get(function () {
  const addr = this.address;
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
});

// Method to check if cinema is open at given time
cinemaSchema.methods.isOpenAt = function (dayOfWeek: string, time: string) {
  const hours = this.operatingHours.get(dayOfWeek.toLowerCase());
  if (!hours || hours.closed) return false;
  
  return time >= hours.open && time <= hours.close;
};

export const Cinema = mongoose.model<ICinema>('Cinema', cinemaSchema);