# Getting Started 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs necessary packages. NOTE: this project was built with Node 20.5.1

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

## Project Details

### Stack

This project is built with [React](https://react.dev/), [React hooks](https://react.dev/reference/react/hooks), [TypeScript](https://www.typescriptlang.org/), [Material UI](https://mui.com/material-ui/), and [FullCalendar](https://fullcalendar.io/)

#### Stack decisions

I chose Material UI to eliminate time spent making common components like Grids, buttons, headers, and Lists. Also, MUI conforms pretty closely to the Material spec so there's a certain guarantee of accessibility and responsiveness.

In order to not re-invent the wheel, I decided to use a Calendar UI plugin instead of building my own for time sake, and because I know I wouldn't be able to build one as good as what's already out there. I originally chose a different calendar library, but that ended up not working so well, so switched to FullCalendar halfway through which ended up working beautifully. 

## Scheduling Feature

### Design Considerations

For this project, I decided to create two views that the user can flip through. One is the Provider view which allows different providers to submit availability on the calendar, while the other view allows a Client to pick from available times submitted through the Provider calendar.

Once a user hits "+ Reserve" on a time slot, a section appears below with the currently reserved time slots. The user has 30 minutes to confirm the slot, otherwise it'll be released. 


### Dev Considerations

I created a mock API under `/src/api` that just returns/sets an array of Providers with some mock data. In a real-world scenario, this would be more of a Graph/Rest call to a backend API that would update values in a DB, so if one refreshes the page in this app, the data will be lost. 

I also used state vars for mutating data like available providers and slots, events on the calendar, and pending reservations. This is likely not the most performant approach so is definitely a tradeoff.

### Assumptions

- The current user is determined by which "view" they are currently looking at (Provider versus Client)
- The Client can make as many reservations as they want
- There is only one Client

### Tradeoffs

- Bigger components => with more time I would love to organize large blocks into child components with Props so that the parent components aren't so big
- No tests
- Hardcoded hex values => i would prefer these to be some kind of theme-based color scheme, but couldn't figure a way to do so in the allotted time
- There's no way to distinguish between a Client user and a Provider user other than switching views
- Once a reservation is released, there's no visual indication that the slot is available from the list, would likely be able to fix this by resetting the slots array with the released reservations accounted for
- A provider can still put time on the calendar for days in the past, not ideal but given more time I could probably disable the ability to do this


### Final Thoughts
Overall, there are definitely improvements that can be made to the code to be more performant or organized, but I tried to focus on getting the requirements done first before focusing on perfect code.

Thanks all for letting me take part in this code challenge! :)
