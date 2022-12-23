# PhotoPie API

PhotoPie API is a Node Application. It's hosted on Heroku.

## APIs

[https://api-photopie.onrender.com/[api]](https://photo-pie.herokuapp.com/)

* GET - /services - For all services
* GET - /service/:id - For a single service
* GET - /bookings?email=email - Specific user bookings (if user is admin it will return all bookings)
* GET - /check-admin?email=email - Check loggedIn user admin or not
* GET - /all-admins - For all admins list
* GET - /blogs - For all blogs.
* POST - /add-service - For add a Service
* POST - /add-review - For new booking
* POST - /add-blog - For new blog
* POST - /make-admin - For add a admin
* DELETE - /delete-service/:id - Delete a single service
* DELETE - /remove-admin/:id - Delete a single Admin
* DELETE - /delete-blog/:id - Delete a single blog
* PATCH - /change-booking-status/:id - For Changing booking status

## Technology Usage

* Node JS
* Express JS
* MongoDB
