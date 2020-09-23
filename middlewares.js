import multer from 'multer';
import routes from './routes';

const multerVideo = multer({
  dest: 'uploads/videos',
});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Wetube';
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

//should be same name as the name of input(for the file) in upload.pug
export const uploadVideo = multerVideo.single('videoFile');
