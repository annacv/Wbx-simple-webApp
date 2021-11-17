# Knowledge Frontend Test

Welcome to the Wallbox Knowledge Test for Front-end developers!

## Getting started
This test is here to let you show us your amazing front-end engineering skills.
The task? Build interactions and a layout of a common web-app using modern front-end technologies. At Wallbox we work with a progressive javascript framework called Vue.js
The task will be to implement a charger list and charger detail with a responsive design.


## Minimum Goals
- Create an application with Vue3 using the backend a mockups provided.
- Consider not to use any CSS framework, so we can evaluate your css skills.
- Consider not to use the solutions provided by the JSON server for filtering and paginating the elements, doing this filtering at the frontend lets us evaluate your javascript skills.
- The application will be tested using the same algorithm provided to test the resilience of the platform.
- You have an assets folder, you can use that and any icons you consider.
 

## What will we value most?

- The quality of the layout and user interactions.
- Clean code, best practices, and app structure.
- Tested code (Unit test, E2E)    
- Responsive design.
- Data structures, methods, and algorithms.
- App performance.
- Documented code (Storybook)

## Frontend
To build the user interface you should use the latest version of the Vue.js framework:

- vue.js (​https://v3.vuejs.org/) 
                             
Configure your default setup and add all the dependencies that you may need.

## Backend
You have a [swagger](https://gitlab.com/wallbox/hiring/frontend/knowledge-frontend-test/-/blob/master/backend/openapi.yaml) with all the information.
Also we provide raw documentation with the same information

```
backend/api_documentation.html
```
## to serve the backend:

Dataset Just a few chargers
```console
npx json-server backend/dataset/db.json
```

Dataset of 1000 chargers 
```console
npx json-server backend/dataset/db_long.json
```

Random generated Dataset
```console
npx json-server backend/dataset/random-db.js
```

## Enums and units

### charger status 

- **10, 11** - ready
- **20** - charging
- **50, 51, 52, 53, 45, 55** - error

### charger types 

- Cooper
- Commander
- Pulsar

### connectivityType

- ethernet
- wifi

### chargingTime
- milliseconds

### currentCharging
- Amps

### energySupplied
- KiloWatts

### manufacturedDate
- ISO Date

## Design
The design is important and it's something that we take very seriously at Wallbox.                
You have a [high-fidelity wireframes with figma](https://www.figma.com/file/LyCKXPruuveHOLXA112jDA/Knowledge-Frontend-Test?node-id=0%3A1) or some captures in the design folder in which you can see the layout of the application. You can use a modern UI widget or component toolkits. Consider not to use any CSS framework, so we can evaluate your CSS skills.

## How to submit your test
                            
Just push all your changes to this repository 
