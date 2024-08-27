import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getBlog, relatedBlog, updateBlog } from '../controllers/blog.js';
// import { verifyToken } from '../middleware/verifyToken.js';
// import { isAdmin } from '../middleware/isAdmin.js';

const router=express.Router();


router.post('/create',createBlog);
router.get('/getAll',getAllBlog);
router.get('/get/:id',getBlog);
router.patch('/update/:id',updateBlog);
router.delete('/delete/:id',deleteBlog);
router.get('/related/:id',relatedBlog);


export default router;