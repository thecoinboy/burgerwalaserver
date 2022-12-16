import express from 'express'
import { getAdminStats, getAdminUsers, login, logOut, myProfile, ragister} from '../controller/users.js'
import { adminAuth, isAuthenticated } from '../controller/auth.js' 
export const router = express.Router();

// ragistration route

router.post('/login', login)
router.post('/ragister', ragister)
router.get('/me', isAuthenticated, myProfile)
router.get('/logout', logOut)

router.get('/admin/users' ,isAuthenticated, adminAuth,  getAdminUsers )
router.get('/admin/stats' ,isAuthenticated, adminAuth, getAdminStats )

// for checking server working or not

router.get('/check', (req, res, next) =>{
    res.send("<h1> Workin good</h1>")
})
