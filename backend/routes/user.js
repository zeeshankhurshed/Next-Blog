import express from 'express';
import { deleteUser, getAllUsers, login, logout, register, updateUser } from '../controllers/user.js';


const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/getAll',getAllUsers);
router.delete('/delete/:id',deleteUser);
router.patch('/update/:id',updateUser);

export default router;