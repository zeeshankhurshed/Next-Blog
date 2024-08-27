import express from 'express';
import { allComments, postComment } from '../controllers/comment.js';


const router=express.Router();


router.post('/create',postComment);
router.get('/getAll',allComments)

export default router;