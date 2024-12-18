const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductsRouter = require('./Routes/ProductsRouter');
const profileRoutes = require('./Routes/ProfileRouter');
const checklistRoutes = require('./Routes/ChecklistRouter')
const ActivityRouter = require('./Routes/ActivityRouter')
const session = require('express-session');
const passport = require('./config/passport'); // Import Passport config
require('dotenv').config();
require('./config/db');

// Middleware setup
app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Replace with your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow credentials (e.g., cookies)
}));app.use('/auth', AuthRouter);
app.use('/products', ProductsRouter);
app.use('/profile', profileRoutes)
app.use('/checklist', checklistRoutes)
app.use('/activity', ActivityRouter )



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
const {rescheduleMissedTasks} = require("./Controllers/ChecklistController")
app.post('/manual-cron', async (req, res) => {
    try {
        // Fetch all users
        const users = await User.find();  // Assuming you have a User model to fetch users
        console.log("These are the users",users)
        // Iterate over all users and reschedule missed tasks for each user
        for (const user of users) {
            // Call the reschedule function for all checklist types (Morning, LateMorning, etc.)
            await rescheduleMissedTasks(user._id, 'Morning');
            await rescheduleMissedTasks(user._id, 'LateMorning');
            await rescheduleMissedTasks(user._id, 'Afternoon');
            await rescheduleMissedTasks(user._id, 'Evening');
            await rescheduleMissedTasks(user._id, 'Night');
        }

        console.log('Cron job completed: Missed high-priority tasks have been rescheduled.');

    } catch (err) {
        console.error('Error in cron job for rescheduling missed tasks:', err);
    }
});
const cron = require('node-cron');
const User = require('./Models/User')
// Schedule rescheduling tasks at midnight for Morning checklist
cron.schedule('59 23 * * *', async () => { 
    try {
        // Fetch all users
        const users = await User.find();  // Assuming you have a User model to fetch users
        console.log("These are the users",users)
        // Iterate over all users and reschedule missed tasks for each user
        for (const user of users) {
            // Call the reschedule function for all checklist types (Morning, LateMorning, etc.)
            await rescheduleMissedTasks(user._id, 'Morning');
            await rescheduleMissedTasks(user._id, 'LateMorning');
            await rescheduleMissedTasks(user._id, 'Afternoon');
            await rescheduleMissedTasks(user._id, 'Evening');
            await rescheduleMissedTasks(user._id, 'Night');
        }

        console.log('Cron job completed: Missed high-priority tasks have been rescheduled.');

    } catch (err) {
        console.error('Error in cron job for rescheduling missed tasks:', err);
    }
});


