import nextConnect from 'next-connect';
import multer from 'multer';

try{const upload = multer({
  storage: multer.diskStorage({
    destination: './public/',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('theFiles'));

// apiRoute.post((req, res) => {
//   res.status(200).json({ data: 'success' });
// });
res.json({data:'ok'})
}catch(err){
  res.json(err.message)
  console.log(err.message)
}
export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
