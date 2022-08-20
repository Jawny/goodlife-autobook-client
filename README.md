# Goodlife Fitness Workout Scheduler

During the peak of the COVID-19 pandemic Goodlife Fitness introduced a workout booking system that forced users to schedule their workouts at 12:00 AM each night. Furthermore the sessions were limited down to 10 slots every hour. 
Scheduling workouts became near impossible with thousands of people trying to schedule works at the same time every day.

I built a solution to this problem, by creating an automated bot 
to help users around Canada secure workout sessions without manually logging in.

## Front End
Built with ReactJS, the front end served mainly for users to
manage their billing and workout schedule. Authentication was handled
with Auth0 and billing with Stripe.

![App Screenshot](https://i.imgur.com/dwiYwOD.png)

## Back End
View the back end code [here](https://github.com/Jawny/goodlife-booking-server).
I built the back end with Nodejs, stored user data with MongoDB, and handled payments with Stripe.

I chose to use MongoDB initially because I wasn’t certain on the structure I wanted to store my data as and it made sense at the time to pick something flexible.

## Scheduling Script

View the outdated script [here](https://github.com/Jawny/goodlife-booking-script/tree/master/utils).

The general idea for this script is that it’s running on a VM with a cron job. Every night the script will parse through the accounts saved on MongoDB and check if the user needs to have a workout scheduled, if they do then their gym credentials are used to login via the endpoint available by Goodlife and the cookies are saved to a local variable. Next, when the clock strikes 12:00 AM a second cron job runs using the cookies saved previously and all users are booked using another endpoint made available by Goodlife in parallel.

![Architecture](https://i.imgur.com/CDEIil8.png)

## Outcome
This is my first time building a project with real users, and I was able to build up 60 concurrent subscribers over the course of 2 months. This was definitely an interesting learning process. I ran into a lot of bugs that I didn’t find out about until after users started mentioning them. I didn’t have a proper method set up to unsubscribe from the bot, and ensuring high reliability of the script was something I had not thought about that caused issues for some users. If I were to do this again I would definitely consider rewriting the script with more error checks as it currently just ignores all errors that occur during the scheduling process.
