# WPI Games

Now accessible 24/7/365: [https://team10-finalproject.onrender.com/](https://team10-finalproject.onrender.com/)

An online platform to play hangman, crossword (and in the future more?) games, with Worcester Polytechnic Institute in mind! Designed to educate new-commers to WPI lore, traditions, and terminology, this is a great collection of entertaining games to learn more about what goes on here at WPI and its history! There is also an administrative user type that can add and remove words from the hangman game.

**Team Members:**

- Connor Chartier
- Seth Frank
- Spencer Greene
- Jacob Silvester
- Nicolas Valentino

See our attached [Sprint Log](https://docs.google.com/document/d/1U8EGgIxi2U0Ok7l_tWpQN8ZBPJ3YaMWEMvKGJfphEgI/edit?usp=sharing) for a collection of responsibilities!

**Technologies Used**

* Express (w/ Vite-Express): We use express to implement the server-client interaction with our application.
* Bootstrap: All our styling for the different pages utilizes Bootstrap to make our design visually appealing and consistent throughout. It also enabled us to make it easier when coding our design.
* Svelte: We use Svelte to ease our HTML and client-side JS for our pages.
* MongoDB
* Passport (W/ Passport-Github): We use Passport for our sign in page so that we can use GitHub to log into our application.

**List of Features**

- Login Page: We utilized Passport to create a sign in page using GitHub. This enables the user to click the sign in button which will take them to GitHub page to allow them to log in. Once logged in, it enables the user to access the games to play.
- Home Page: We set up a home page that allows the user to access the games and other features of our application. We have cards that enable the user to choose a game to play. We also have a header that is the same across all other pages that enables the user to log out as well as navigate back to the homepage.
- Crossword Game: The crossword game allows the user to choose between an easy, medium and hard game that involves clues to WPI words. It starts by allowing the player to choose and then loads the correct crossword from the database. The user can then see the clues and type in the words they think they are. The user can then click “Check Crossword” to see if their guess was correct or not.
- Hangman Game: The hangman game allows the user to guess different WPI words. It starts by randomly choosing a word that is stored in the database and displays it using just “_”. The user can then use the buttons to guess letters. Once a button is pressed, it will show that button in the guessed letters list and either display the letter in the word if it exists or add a limb to the hangman. Once all the limbs are present or the word is guessed, it will display a message and disable all the buttons until you click a new word.
- Admin User: This user can add and remove words from the crossword game, allowing it to be expanded upon in the future. To utlize admin privalleges, click on the box with your username in the top right corner of the screen. This will allow you to add and remove words from the hangman game.

**Challenges Faced**

- Implementation of the Crossword: We had some difficulty figuring out how to setup the crossword. We ended up utilizing a table and blacking out the certain boxes that we aren’t using and then leaving the ones we blank with inputs that have letters in them. We also had problems with checking whether the crossword is correct. We ended up using a check word button since we can just check the entire table when we click this button instead of having to check boxes individually.
- Utilization of GitHub: One of our team members hasn’t used GitHub before, so we taught him more about how to utilize the features including pulling, committing, pushing and utilizing branches and pull requests. We also had some challenges when having to deal with merge conflicts. We tried our best to merge with main often so that we didn’t have too many merge conflicts, but still had to deal with them, ensuring that we kept the right code that we wanted for our project.
- How to Store Data in the Database: One challenge we faced was figuring our what we wanted to store within the database and what we should store locally in our server. For our crossword, we ended up storing the gameboards and solutions inside of the database so that in the future, this allows for easier changeability and additions to the crosswords. We also store the clues for the crossword in the database for the same reason. While we do store these things in the database, we end up copying them locally as well so that we don’t have to do as many GET requests to retrieve the data, in turn making it faster.
- Passport with GitHub: We were somewhat unfamiliar using Passport, so learning how to use it and integrating it with GtHub login was a bit difficult to learn.
- Admin user: We also wanted to ability to add and remove crossowrd puzzles form the game, not just hangman words. Though, due to previous challenges we faced, along with the scope and deadline for the project, we were unable to implement that functionality to our program.

**Accessibility Features**

- High contrast on our crossword with the black and white on the table.
- Utilizing login with GitHub makes it very easy for the user to log in so that they don’t have to remember a username and password.
- Utilizing Bootstrap to ensure our styling and format is set up correctly and accessible. This includes ensuring our headings are set up correctly and color format and such is accessible for everyone.
- We utilized large buttons to ensure everything is clear and easy to tell for the user.
