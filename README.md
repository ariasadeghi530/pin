# pin

## About this app
- This is a MERN stack application, allowing developers to view, post, and pin(save) project ideas, intended to be used as practice or to add to their portfolio.

## How to use this app

 ### Login/Sign Up
- When going to the site, unless you were previously logged in, you will be asked to login or register.
- Input the required information for registration and if there are no issues, you will be redirected to the home page.
- If you forget your password, clicking on Forgot Password will allow you to enter the email address of your account, and it will send you your account name and a reset link to reset your password.

 ### Home/Navbar
- On the home page, you will see all the posts, ordered by upload date. 
- Each card contains the name of the project idea, the username of the poster, the perceived difficulty, as well as the description.
- Clicking on an idea will take you to that post, to see more information about it. 
- In the Navbar, you will see a search bar, profile link, a link to post a new idea, and a logout button. 

### Profile
In your profile, you will see:
- Username
- Profile image from github (if you added it)
- Full name
- Bio
- Link to your github
- Edit button
- Dropdown for your posted ideas 
- Dropdown for your pinned ideas

- Clicking edit makes the card a form, where you can edit and save account information.
- In the ideas dropdown, you will see cards for each of your posted ideas, which will take you to the post. 
- In the pinned projects dropdown, you will see cards for each of your pinned projects, which will take you to the post. 

### New Idea
- Post an project idea, providing a title/name, a description, a difficulty, and an estimated time to complete the project.

### Ideas
Idea page contains: 
- A Pin to save to project
- If you posted the idea, you will see a vertical dots icon, else it will be the username of the original poster
- The vertical dots allows the poster to edit or delete the idea. 
- Editing the idea will turn the card into a form, prefilled with the current information, where the user can update and save any changes.
Solutions section:
 The solution card contains:
  - Username of the user who posted the solution
  - A delete icon (if the signed in user posted it)
  - A short description
  - Link(s) to the GitHub Repo, and deployed app (if any)
Comments section:
 A comment contains:
  - The username of the commenter
  - A delete icon (if the signed in user posted it)
  - The comment
  - An input to add a comment

## Future Development
- The ability to view other user profiles, as well as connect with other users to work on projects together.
- Different project categories, different kind of projects, whether it be a full stack, front end, etc, or even by technologies used.
- Branch out to other project ideas besides web development, such as photography, music, so the platform can be for all types of creators and developers.
