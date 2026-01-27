---
name: adding-a-new-app-route
description: Fully wires up a new route with required boilerplate, following this repo's conventions for subapps. Use when user wants to add a new route or app or subapp or page or screen.
allowed-tools: Skill(beep)
---

# Adding a new route

Use this checklist to track your work:

- [ ] Determine name & route for the new app
- [ ] Determine the kind of app to create
- [ ] Create a folder for the new app
- [ ] Mount the new app in the global routes listing
- [ ] Consider next steps

## Determine name & route for the new app

If the name of the new app and the desired route have not already been specified, `AskUserQuestion` to determine that information, e.g. `MyApp` at `/my-app`.

## Determine the kind of app to create

- **Static**: The simplest possible app with static-only content
- **Dynamic**: A typical app that fetches data based on route params

Use the answer in the next step.

## Create a folder for the new app

- Choose the correct template directory based on the previous step:
  - **Static**: `./templates/static/Replace/`
  - **Dynamic**: `./templates/dynamic/Replace/`
- Use that directory as the template for the new subapp
- Recreate that folder structure under `/src/Apps/<NewApp>`
- Replace all instances of `replace` and `Replace` with appropriate naming (case-sensitive)

## Mount the new app in the global routes listing

Add the new route to the main route list at `src/routes.tsx`. Follow existing conventions re: alphabetization.

## Consider next steps

Additional dev advice:

- You may need to restart the server for the new route to take effect
- Then visit http://localhost:4000/{replace} to see your new app
- Examine the generated code for additional follow-ups

## Celebrate

Indicate you are done with a /beep
