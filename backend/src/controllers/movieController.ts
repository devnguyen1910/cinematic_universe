import { Request, Response, NextFunction } from 'express';
import { Movie } from '../models/Movie';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

export const getAllMovies = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const filter: any = {};
  
  // Filter by genre
  if (req.query.genre) {
    filter.genres = { $in: [req.query.genre] };
  }

  // Filter by language
  if (req.query.language) {
    filter.language = req.query.language;
  }

  // Filter by rating
  if (req.query.minRating) {
    filter.rating = { $gte: parseFloat(req.query.minRating as string) };
  }

  // Filter by release year
  if (req.query.year) {
    const year = parseInt(req.query.year as string);
    filter.releaseDate = {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year + 1, 0, 1)
    };
  }

  // Search by title
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Sort options
  let sort = {};
  if (req.query.sort) {
    const sortBy = req.query.sort as string;
    if (sortBy === 'rating') sort = { rating: -1 };
    else if (sortBy === 'releaseDate') sort = { releaseDate: -1 };
    else if (sortBy === 'title') sort = { title: 1 };
    else sort = { createdAt: -1 };
  } else {
    sort = { createdAt: -1 };
  }

  const movies = await Movie.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('reviews', 'rating comment user createdAt');

  const total = await Movie.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: movies.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: {
      movies,
    },
  });
});

export const getMovie = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await Movie.findById(req.params.id)
    .populate({
      path: 'reviews',
      select: 'rating comment user createdAt isVerified',
      populate: {
        path: 'user',
        select: 'firstName lastName'
      }
    });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  // Increment view count
  movie.viewCount += 1;
  await movie.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

export const createMovie = catchAsync(async (req: Request, res: Response) => {
  const newMovie = await Movie.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      movie: newMovie,
    },
  });
});

export const updateMovie = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

export const deleteMovie = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getMovieStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await Movie.aggregate([
    {
      $match: { rating: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$language' },
        numMovies: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgDuration: { $avg: '$duration' },
        minRating: { $min: '$rating' },
        maxRating: { $max: '$rating' }
      }
    },
    {
      $sort: { avgRating: -1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

export const getNowPlaying = catchAsync(async (req: Request, res: Response) => {
  const movies = await Movie.find({
    releaseDate: { $lte: new Date() },
    status: 'released'
  })
    .sort({ releaseDate: -1 })
    .limit(10);

  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

export const getUpcoming = catchAsync(async (req: Request, res: Response) => {
  const movies = await Movie.find({
    releaseDate: { $gt: new Date() },
    status: 'upcoming'
  })
    .sort({ releaseDate: 1 })
    .limit(10);

  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

export const getTopRated = catchAsync(async (req: Request, res: Response) => {
  const movies = await Movie.find({
    rating: { $gte: 4.0 },
    totalReviews: { $gte: 10 }
  })
    .sort({ rating: -1, totalReviews: -1 })
    .limit(10);

  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});