# Training - Nuxt Assignment

The assignment focused on building a **"Merge Token - Repository Management System"** that allows user to manage repository tokens and collaborate in a team, can track the applications, its availability and status; hence preventing ambiguous access to a particular token.

## Features
- Secure login using **Google Auth Integration** 
- Dynamic access control to users based on their roles.  
- Auth Middleware to prevent unauthorized URL manipulation. ( Eg. Normal users are blocked from accessing '/admin' routes)  
- Only Admin have access to create new repositories.
- Users can view, search or filters the applications.

## Tech Stack 
- **Frontend** : Nuxt 3( Vue Engine ), Pinia , SCSS(Styling)
- **Backend** : Nuxt 3(Nitro Server) , MongoDB (database), nuxt-auth-utils(session)


## Login Page
![capture_20260424181558675.bmp](https://github.com/user-attachments/files/27052963/capture_20260424181558675.bmp)

## User View (Dashboard)
![capture_20260424180719586.bmp](https://github.com/user-attachments/files/27052258/capture_20260424180719586.bmp)

## Admin View 
(https://go.screenpal.com/watch/cOfZXYnOz5g)

### Admin Dashboard View
![capture_20260424180935424.bmp](https://github.com/user-attachments/files/27052339/capture_20260424180935424.bmp)

### Admin Panel View
![capture_20260424181255037.bmp](https://github.com/user-attachments/files/27052405/capture_20260424181255037.bmp)
