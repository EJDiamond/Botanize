# Botanize

For my project five milestone, I have created the social platform Botanize, the site offers a space where plant owners can come to share images and problems they are facing with their plants, so other users can answer and help them with tips and solutions. Alongside this, users can upload images and content about their favourite plants for others to view.

[View live project](https://botanize.herokuapp.com/)


![Responsive image](/assets/images/responsive.png)

# Table of contents
1. [User Experience](#user-experience(ux))
    - [Purpose](#purpose)
    - [Goal](#goal)
    - [Audience](#audience)
    - [Communication](#communication)
    - [Future goals](#future-goals)
    - [Design](#design)
        - [Typography](#typography)
        - [Colour](#colour)
        - [Wireframes](#wireframes)
        - [Database Schema](#database-schema)
2. [User Stories](#userstories)
3. [Features](#features)
    - [Existing Features](#existing-features)
    - [Future Features](#future-features)
4. [Technologies Used](#technologies-used)
5. [Testing](#testing)
    - [Validator testing](#validator-testing)
    - [Manual Testing](#manual-testing)
6. [Bugs and Fixes](#bugs-and-fixes)
7. [Deployment](#deployment)
6. [Credits](#credits)
7. [Acknowledgements](#acknowledgements)

# User Experience(UX)

## Purpose

The target audience for St. George Resort are:

    - People looking holiday at a beach resort
    - Couple and families
    - People looking to visit Hawaii

The target user will be looking for:

    - A website that is easy to navigate and find the realtive information they are looking for
    - Images of the resort and different rooms available
    - Ingormation on other activites and excursions the resort offers
    - The ability to send a booking request to stay at the resort
    - A way to contact the resort directly with any questions they may have

As many people view website on smaller  screen devices I have allowed for this by creating a resposive website using boostrap and css.

## User Stories

My user stories can also be found [here](https://github.com/users/EJDiamond/projects/5).

1. As a user I can easily navigate the site to find desired content to decide if I want to stay at the hotel.
2. As a user I can find useful information about the hotel on the home page so I can spend less time browsing the site.
3. As a user I can use a navigation bar to move around the site with ease.
4. As a user I can see the name of the page in the browser window so that I know which page I am viewing.
5. As a user I can contact the hotel via a form so that I can ask additional questions.
6. As a user I am notified that my contact form has been sent.
7. As a user I can see activities and excursions the hotel has to offer.
8. As a user I can request to book a room so that I can stay at the hotel.
9. As an admin user I can log in so that I can view bookings and contact forms on the backend.
10. As an admin user I can edit and/or delete bookings so that I can assist any customers who need help modifying their booking.
11. As an admin user I can change customer booking status from requested to confirmed.
12. As a user I can register an account so that I can view/manage my booking requests.
13. As a registered user I can login to my account so that I can manage my bookings.
14. As a registered user I can see clearly if I'm logged in, so that I can either log in or out.
15. As a registered user, I can log out of my account so that I am signed out securely.
16. As a registered user I can edit my booking request so that I can make any changes needed.
17. As a registered user I can delete my booking request so that I can cancel my stay if needed.

## Scope

The following features will be implemented to achieve the user stories:

    - The landing page will summarise what the resort has to offer showing room types, activities and excursions offered as well as the contact details for the resort and links to request to book a room.
    - The navbar will have links to all pages and be scrollable and resposive so always accessible to the user.
    - The accomodation page will show all rooms abvailable and their features, with links to the booking page.
    - The booking page will allow users to send a booking request to the resort.
    - The my bookings page will allow the user to view there booking requests to see if they have been confirmed and allow them to edit/delete them.
    - The contact page will allow the user to send a message to the resort.
    - Register and login/out features using Django allauth.

## Structure

### Database

I have used two models to store the information for the hotel app, Booking and Contact:

![Models](/assets/images/models.png)

### Skeleton

St. George resort wireframes can also be viewed [here](https://github.com/EJDiamond/St-George-Resort/blob/main/assets/images/hotel-wireframes.png).

![Wireframes](/assets/images/hotel-wireframes.png)

Produced website differs slightly from wireframes as bootstrap features such as cards and carousels allowed me to enhance the website further.

### Surface

I chose to use a simple colour scheme of green, grey and white as I felt the overall look of the website was clean and more appealing to the eye.

![Green](/assets/images/colour.png)
![Grey](/assets/images/grey.png)

I chose the two fonts Playfair Display and Source Sans Pro:

- Playfair Display was used for all heading in a heavy font weight depending on whether it was a H1, H2 etc.
- Source Sans Pro was used across the body of the site as well as for some sub headings as I felt it complimented the H1 headings effectively.


## Features


#### - __Navigation Bar__

The navigation bar has links to all the pages the users are able to access, the page title allows the user to know which page they are viewing. As the page is scrolled the nav bar turns green so that white text can still be visible to the user.

![NavBar](/assets/images/navbar.png)
![Green NavBar](/assets/images/green-nav.png)


#### - __Navigation Bar Mobile__

On a smaller screen device the navigation bar condenses to toggle form and and the background of the drop down menu is set to green so again the text can be viewed on the white background of the pages.

![Mobile NavBar](/assets/images/mobile-landing.png) ![Mobile NavBar](/assets/images/mobile-navbar.png)


#### - __Room View Carousel__

The rooms choices are displayed on an automatic carousel which allows the user to view all the rooms and has link to view the details of the room on the accomodation page and to book the room on the bookings page.

![Room Carousel](/assets/images/room-carousel.png)


#### - __Activities__

The activities and excursions the resort has to offer are displayed on the landing page in a grid format which is resposive and displays in column form when viewed on smaller devices.

![Activites](/assets/images/activities.png)


#### - __Footer__

The footer displays all the hotel contact details including the address, location and social links.

![Footer](/assets/images/footer.png)


#### - __Accomodation__

This page displays the rooms and their features. Each room type is presented with a carousel with a number of images of each room, displayed next to the name and the features of the room type. There is a link to the booking page on each room. These cards are responsive and therefore shrink to fit smaller screen sizes.

![Rooms](/assets/images/room-info.png)


#### - __Booking__

The booking page presents the four room types in small cards above the booking form the remind the user of the room types. Below is the booking form used to send a booking request to the resort using the booking model.

![Booking Form](/assets/images/booking-form.png)


#### - __Contact Us__

This page allows the user to send the resort a message with a simple user friendly form using the contact model.

![Contact Form](/assets/images/contact-form.png)


#### - __My Bookings__

The my bookings page shows the user the bookings they have request and their details. From here the user can see if the request has been approved as well as select to edit and delete their booking.

![My Bookings](/assets/images/my-bookings.png)


#### - __Edit Bookings__

From the my bookings edit booking link the user is sent to the booking form with all the booking details prepopulated, from here they can change an aspect of the booking they require.

![Edit Bookings](/assets/images/edit-booking.png)


# Technologies Used

- [Django](https://www.djangoproject.com/)
    - Frame works used to build the project and its app.

- [Python](https://www.python.org/)
    - Programming language used to write all of the code in the website.

- [Github](https://github.com/)
    - Used to save project code from Git.

- [Gitpod](https://www.gitpod.io/)
    - The develpment environment used to build project.

- [Boostrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
    - Used for creating the layout and ensuring responsive design

- [SQLite](https://www.sqlite.org/index.html)
    - Used to run local database test

- [PostGres](https://www.postgresql.org/)
    - Herokus Postgres database used to store data once deployed

- [Drawspl](https://drawsql.app/)
    - Used to mock up models for database

- [Heroku](https://www.heroku.com)
    - Platform used to build and host site.

- [Pep8](http://pep8online.com/)
    - Used to test code for issues

- [Adobe Illustrator](https://www.adobe.com/)
    - Used to build wireframes and do all image resizing

- [Cloudinary](https://cloudinary.com/)
    - Used to store all images

- [Favicon.io](https://favicon.io/)
    - Used to create favicon for site

- [FontAwesome](https://fontawesome.com/)
    - Used to get items form my contact details and room features

- [Google Fonts](https://fonts.google.com/)
    - Used to get fonts for the project.

- [Google Developer Tools](https://developer.chrome.com/docs/devtools/)
    - Used to fix css issues whilst building the project

- [AmIResponsive](https://ui.dev/amiresponsive)
    - Used to create image to show the site is responsive

# Testing

A combination of both manual and automated testing has been used to check the webistes functionality.

## Code Validation

#### - __W3C Markup Validation Service__

 - Used to validate the html code used in the website, the results can be found [here](https://validator.w3.org/nu/?doc=https%3A%2F%2Fst-george-resort.herokuapp.com%2F).


#### - __W3C CSS Validation Service__

- Used to validate the css code used in the website, the results can be found [here](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fst-george-resort.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en
).

#### - __Pep8__

- Used to test the code for any errors.

#### - __Lighthouse__

- Used to test the code for accessibility.

![Light House Results](/assets/images/lighthouse.png)

#### - __Coolors Contrast Checker__
- Used to check the contract of the foreground and background colors.

![Green check](/assets/images/green-check.png)
![White check](/assets/images/white-check.png)

## Manual Testing

I have tested this code myself on multiple screen sizes as well as asking friends and family to review on different size devices.

### Website Functionality

1. User Story: I can easily navigate the site to find desired content to decide if I want to stay at the hotel.
    - Test Case: 001 - User navigates landing page -> Clicks on links and buttons to view other webpages and see what the resort has to offer.
    - Test: Passed
2. User Story: As a user I can find useful information about the hotel on the home page so I can spend less time browsing the site.
    - Test Case: 002 - User browsers the landing page and finds rooms details, activity details and information on hotel contact and location.
    - Test: Passed
    ![Room Carousel](/assets/images/room-carousel.png)
    ![Footer](/assets/images/footer.png)

3. User Story: As a user I can use a navigation bar to move around the site with ease.
    - Test Case: 003 - User navigates landing page -> Uses navigation bar to move around the site with ease, when the page is scrolled the navigation bar changes to a green background so the text is stil readable. When view on smaller devices the navigation become a toggle menu for a better user experience.
    - Test: Passed
    ![Navbar](/assets/images/transparent-nav.png)
    ![Green Navbar](/assets/images/green-navbar.png)

4. User Story: As a user I can see the name of the page in the browser window so that I know which page I am viewing.
    - Test Case: 004 - User navigates around the site and the page title lets them know what page they are on. The example below shows the user on the booking page.
    - Test: Passed
    ![Page Title](/assets/images/page-name.png)

5. User Story: As a user I can contact the hotel via a form so that I can ask additional questions.
    - Test Case: 005 - User navigates to 'contact us' link in the navigation bar, once there, they are presented with a form which is send to the database. This feature can be used whether or not the site user is logged in.
    - Test: Passed
    ![Contact Form](/assets/images/contact-form.png)

6. User Story: As a user I am notified that my contact form has been sent.
    - Test Case: 006 - User fills in contact form and clicks submit, the user is redirected to the homepage and a message pops up to tell them that their message has been sent to the resort.
    - Test: Passed
    ![Contact Form Message](/assets/images/contact-message.png)

7. User Story: As a user I can see activities and excursions the hotel has to offer.
    - Test Case: 007 - User navigates down the landing page and finds the activities and excursions section. The user can also locate the spa page by clicking the spa link in the navigation bar.
    - Test: Passed
    ![Activity Section](/assets/images/all-activities.png)
    ![Spa Page](/assets/images/spa.png)


### Admin Functionality

1. User Story: As an admin user I can log in so that I can view bookings and contact forms on the backend.
    - Test Case: 009 - Admin user navigates to the login link on navigation bar and logs in. The data is presented, showing the users, bookings and any contact that has been made.
    - Test: Passed
    ![Admin Database](/assets/images/database.png)

2. User Story: As an admin user I can edit and/or delete bookings so that I can assist any customers who need help modifying their booking.
    - Test Case: 010 - Admin user logs in and opens database from here they can add/edit bookings.
    - Test: Passed
    ![Admin Add Booking](/assets/images/admin-add-booking.png)
    ![Admin Edit Booking](/assets/images/admin-booking.png)


3. User Story: As an admin user I can change customer booking status from requested to confirmed.
    - Test Case: 011 - Admin user logs in and opens database from here they can change the customer booking status to confirmed or denied.
    - Test: Passed
    ![Booking Confirmed](/assets/images/confirmed.png)
    ![Booking Denied](/assets/images/denied.png)

### User Authentication

1. As a user I can register an account so that I can view/manage my booking requests.
    - Test Case: 012 - Users navigates to the register link in the navigation bar and fills in registration form, once they have successully submitted they will be redirected to the homepage and a message will pop up telling them they are registerd.
    - Test: Passed
    ![User Registered](/assets/images/register.png)
    ![User Bookings](/assets/images/bookings.png)

2. User Story: As a registered user I can login to my account so that I can manage my bookings.
    - Test Case: 013 - Registered user clicks login link in navigation bar and fills user credentials in the login form. Once logged in they are navigated back to the homepage and a message telling them they successfully logged in pops up.
    - Test: Passed
    ![User Logged in](/assets/images/login.png)

3. User Story: As a registered user I can see clearly if I'm logged in, so that I can either log in or out.
    - Test Case: 014 - User logs in, when they are logged in they will have an option to log out in the top right of navbar, hence letting them know they are logged in.
    - Test: Passed
    ![Confirm Logged in](/assets/images/logged-in.png)

4. User Story: As a registered user, I can log out of my account so that I am signed out securely.
    - Test Case: 015 - Logged in user selects to log out and confirms, they are redirected to the homepage and a message tells them they have successfully logged out.
    - Test: Passed
    ![User Signed Out](/assets/images/sign-out.png)

### Reservation Functionality

1. User Story: As a user I can request to book a room so that I can stay at the hotel.
    - Test Case: 008 - Logged in user navigates to the booking page by selecting a 'book now' link on either the navigation bar or by using the various 'book now' buttons across the site. They are sent to the booking page where they are prompted to fill in their details. If a date selected is in the past the user will see an error message, 'must select a future date' and will be sent back to the prepopulated form. Once the booking has been requested they will be redirected to the homepage and see a 'thanks for your booking' message.
    - Test: Passed
    ![Select Date In Future Error](/assets/images/incorrect-date.png)
    ![Booking Success](/assets/images/booking-success.png)

2. User Story: As a registered user I can edit my booking request so that I can make any changes needed.
    - Test Case: 016 - Logged in user can navigate to 'my bookings' in the navigation bar and select which booking they wish to modify with the edit button. They will be sent to the booking form prepopulated with their booking details, which they can change and submit. Once submitted they will recieve a confirmation messsage.
    - Test: Passed
    ![Edit Booking](/assets/images/edit-bookings.png)
    ![Edit Booking Confirmed](/assets/images/edit-confirmed.png)

3. User Story: As a registered user I can delete my booking request so that I can cancel my stay if needed.
    - Test Case: 017 - Logged in user can navigate to 'my bookings' in the navigation bar and select which booking they wish to cancel with the cancel booking button. They will be shown a pop message to tell them that their booking has been cancelled.
    - Test: Passed
    ![Cancel Booking](/assets/images/cancel-booking.png)

## Automated Testing

I used Coverage library whilst testing to see how much of my Python code was included in the tests I have written, the report which can be found [here](https://8000-ejdiamond-stgeorgeresor-bkqcl9asbtz.ws-eu73.gitpod.io/htmlcov/), shows that 86% of my code was covered, the remaining code is covered by manual testing.

## Bugs and Fixes

- After passing my code through the HTML validator, I recieved the error "H1 headings must be highest headings on the page", so I went back through my CSS and switched around heading classes to pass the validation.

- My ifame used for the google map in my footer showed up some outdated styling features on the validator, they were not needed to I removed them from the HTML file.

# Credits

During the development of my project I used a number of resources to help me tackle problems and fix bugs.

[DatePicker](https://mrasimzahid.medium.com/how-to-implement-django-datepicker-calender-in-forms-date-field-9e23479b5db)

[CSS Fade In](https://stackoverflow.com/questions/11679567/using-css-for-a-fade-in-effect-on-page-load)

[Carousel Arrow Colour](https://stackoverflow.com/questions/46249541/change-arrow-colors-in-bootstraps-carousel)

[Scrolling NavBar](https://www.youtube.com/watch?v=xYA2bcEHKg8)

[Contact Form](https://ordinarycoders.com/blog/article/build-a-django-contact-form-with-email-backend)

[Django Phone Number](https://pypi.org/project/django-phonenumber-field/)

[Sourced Images - Unsplash](https://unsplash.com/)

[Django Allauth](https://django-allauth.readthedocs.io/en/latest/installation.html)

# Deployment

## Github and Gitpod

To create my project I used the [Code Institute Gitpod Full Template](https://github.com/Code-Institute-Org/gitpod-full-template)

- Click the Use This Template button.
- Add a repository name and brief description.
- Click the Create Repository from Template to create your repository.
- To create a Gitpod workspace you then need to click Gitpod, this can take a few minutes.

## Heroku

### Initial Set Up

1. Install Django and gunicorn: ```pip3 install django gunicorn```
2. Install supporting libraries: ```pip3 install dj_database_url psycopg2```
3. Install Cloudinary Libraries ```pip3 install dj3-cloudinary-storage```
4. Create requirements file pip3 ```freeze --local > requirements.txt```
5. Create Project ```django-admin startproject ST-GEORGE_RESORT .```
6. Create App ```python3 manage.py startapp hotel```
7. In the setting.py file, add to installed apps ```‘hotel’```
8. Migrate Changes ```python3 manage.py migrate```
9. Run Server to Test ```python3 manage.py runserver```

### Creating Heroku Application

To create the application I followed the [Django Blog Cheatsheet](https://codeinstitute.s3.amazonaws.com/fst/Django%20Blog%20Cheat%20Sheet%20v1.pdf).

1. Create a requirements.txt file in order for Heroku to install project dependencies ```pip3 freeze --local > requirements.txt```.
2. Add a ```Procfile```
3. Login to Heroku and create a new app with the location set to Europe.
4. In the Heroku settings, reveal Config Vars and add SECRET KEY and CLOUDINARY URL.
5. In the resources tab, add Heroku Postgres.
6. Connect the Github repository to Heroku by selecting Deploy and selecting Github - Connect to Github.
7. Search for your project name and select Connect.
8. Select Enable Automatic Deploy.
9. Before deploying final project, set Debug to False and remove DISABLE_COLLECTSTATIC.

# Acknowledgements

I would like to thanks my mentor Naoise Gaffney for his constant support throughout my project.