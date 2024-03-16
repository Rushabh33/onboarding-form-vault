Rushabh's Submission, due EoD (5pm), March 16th

**What I was able to do:**
- Create a working application that satisfies the requirements
- Apply code too simulate creating this project in a company code base
-   Added reusable components - although it took me more time, my intention was to showcase my ability to create complex reusable components, experience with css and coding style
-   Tried to simulate creating a onboarding flow by connecting the step counter
-   Added a nested react Context to encourage separation,
- Set up testing for the first time and create initial tests
- I may have bit off more than I could chew by using Next.JS but I wanted to get better using it and I was happy with the result.
  
**Things I would do if I had more time:**
- Abstract out my onboarding/page.tsx file into various components to make it more readable
- Convert the form inputs to controlled components to improve user experience and facilitate validation
- Finish writing the tests!
  - This was my first time setting up tests in a project from scratch. Although I managed to set things up, I struggled to implement the final tests to verify the form. This would have been possible with msw (first time using this as well). I need more time to read through the documents to facilitate the test. Conceptually I know what I would do, but I struggled with syntax
    - I would create handlers that mimic the specific requests my /onboarding/page.tsx file is making
    - I would setup the servers in my tests and apply them before/during/after each test.
- Add yup schema validation to my react-hook-form to abstract the code and apply better type safety to the form. I had actually tried using ZOD, I was running into issues. I found a cleaner solution with Yup and was thinking of implementing it if I had the time. 
