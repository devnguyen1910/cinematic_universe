import { Router } from 'express';
import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieStats,
  getNowPlaying,
  getUpcoming,
  getTopRated,
} from '../controllers/movieController';
import { protect, restrictTo } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/now-playing', getNowPlaying);
router.get('/upcoming', getUpcoming);
router.get('/top-rated', getTopRated);
router.get('/stats', getMovieStats);
router.get('/', getAllMovies);
router.get('/:id', getMovie);

// Protected routes
router.use(protect);

// Admin only routes
router.use(restrictTo('admin'));
router.post('/', createMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;