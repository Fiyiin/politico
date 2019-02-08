# politico
[![Build Status](https://travis-ci.com/Fiyiin/politico.svg?branch=develop)](https://travis-ci.com/Fiyiin/politico)
[![Maintainability](https://api.codeclimate.com/v1/badges/b2e525047d28056f10b8/maintainability)](https://codeclimate.com/github/Fiyiin/politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b2e525047d28056f10b8/test_coverage)](https://codeclimate.com/github/Fiyiin/politico/test_coverage)

Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

## Getting Started

Clone this repo to your local machine to get started. This project is a Node.js project, so you mush have Node.js and npm installed on your local machine.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` to start the application. You will then be able to access it at localhost:3000

---

## Prerequisites

You'll need the following packages to run the projecct

```bash
npm
```

### Tech/framework used
- Node js
- Express
- Mocha
- Supertest
- Chai
- ES6

---

## Features
- Users can sign up
- Users can login to their account
- Admin can create political parties
- Admin can delete a political parties
- Admin can create different political offices
- Users can vote for only one politcian per political office
- Users can see the results of election

#### Api endpoints
```bash
- api/v1/auth/signup
- api/v1/auth/login
- api/v1/parties
- api/v1/parties/:id
- api/v1/parties/:id/name
- api/v1/offices
- api/v1/offices/:id
- api/v1/offices/<userId>/register
- api/v1/votes
- api/v1/offices/<office-id>/result
```

---

### Author
Fiyin Kolawole

### License
This project is licensed under the terms of the **ISC** license.
