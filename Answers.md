## 1. How to run

This project is built using Vanilla HTML/CSS and JavaScript in a single file. Running it requires absolutely zero installations, Node.js commands, or build tools. 

The steps to run the project are listed in the [README.md](README.md).


## 2. Stack & design choices
I picked vanilla HTML/CSS with Javascript because it was the most simplest and basic stack I am familiar with. I have used HTML before to create webpages in school, so I can read and understand the syntax, and I have done basic coding in p5.js, so I can also understand basic Javascript code.

For this assessment, I did not focus on any styling, as my main focus due to my limited knowledge about the stack was to get it working. 

An interaction decision I made is binding calculation to the input event as it eliminates the need for an explicit 'Calculate' button, and reduces user friction.

To divde a not-perfectly-divisble tip among a given number of people, I have decided that person 1 will have to pay the remainder amount (more than others), and this will be informed when such a scenario is encountered. My rationale is that people using this application can negoiate in real life on who is willing to pay more.

## 3. Responsive & accessibility
I have handled the error messages well and they show inline or near the fields as required. What I haven't focused on at all is the specifics of the deployment device and how my app could be visually unappealing due to a lack of colors and thoughtful placement of the UI elements.

## 4. AI usage
I used Gemini to get a blueprint of the initial [calculator.js](calculator.js) and [index.html](index.html) files as shown in the first commit by giving a prompt comprising of the challenge document + *how can i get this done with the bare minimum knowledge about frontend* + *rounding policy: restaurant gets 10, person 1 pays a penny more because everyone knows 10 can't be divided equally by an odd number and someone has to bear the load. how do they decide who is person 1, upto to the people using the app.now*.

I tried running them, encountered errors and then looked up on how to solve them. Eventually figured out the problem why they weren't communicating and then prompted Gemini again for event listeners and added missing helper functions in calculator.js and tried that which worked.

This was my second prompt to Gemini:

*i can view the index.html in my browser, but it is not communicating with my .js file, shouldn't that also be running in the background?*

---

**What's one thing in my submission that isn't polished enough, and what would I do to fix it with another day?**

Definitely improve the UI first, make it more stylisitic with colors and better placement of buttons. Then I can work on deploying it online through Github Pages as I am familiar with it.
