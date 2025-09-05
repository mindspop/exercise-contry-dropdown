## Outline

Build a 'select' component to allow a user to select a country from a list. Use the selection to print the sentence:

> `I am going to {country name}!`

### What we are looking for:

- Data fetching
- State management
- CSS styling
- Component architecture and composition
- Reasoning for tooling choices in `CONTEXT.md`
- _Bonus:_ unit tests

### Getting started

- Familiarise yourself with the provided data from the API
- Head to `/src/App.tsx` to begin
- You are welcome to use the entire repository, create new folders and add files, components as you see fit

### Requirements

- Build a select component that allows a user to select a country
- Print the selection to the screen:
  - `I am going to {country name}!`
- API for fetching countries is available as
  - `GET /api/countries`
  - Feel free to implement data fetching on your own or use the helper async fetch functions provided in `/src/utils`
  - TypeScript types are available for the API data in `/src/types`

### Guidelines

- Consider transient states like disabled, error, empty or loading
- Please match the styling of the dropdowns as per the provided UI mockup
- You are free to install NPM packages to assist your work but,
  - Please do **not** use ready-made UI component libraries such as Material UI, Chakra UI, Flowbite or Daisy UI as we
    would like to see how you approach writing your own custom components and styling
  - Please do **not** use headless/unstyled UI component libraries such as Headless UI or Radix as we would like you to show us what _you_ think constitutes good web UI practices
- You are free to choose and install your preferred styling, data fetching and state management libraries but please add
  a short description in the `CONTEXT.md` file on _why_ you have chosen that library over others
