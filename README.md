# Cookie-Monsters

[ ![Codeship Status for spmcbride1201/cookie-monsters](https://app.codeship.com/projects/64e48010-b8cd-0134-10da-1e953eddbb87/status?branch=master)](https://app.codeship.com/projects/194821) [![Code Climate](https://codeclimate.com/github/spmcbride1201/cookie-monsters/badges/gpa.svg)](https://codeclimate.com/github/spmcbride1201/cookie-monsters) [![Issue Count](https://codeclimate.com/github/spmcbride1201/cookie-monsters/badges/issue_count.svg)](https://codeclimate.com/github/spmcbride1201/cookie-monsters)

See me live at https://cookie-monsters.herokuapp.com/

![Dancing Cookie Monster](https://media.giphy.com/media/RVuNZB864BeVy/giphy.gif)

Cookie Monsters is the ultimate e-Commerce platform for lovers of cookies. Originally built as a senior phase project by Fullstack Academy's greatest trio of students, it has risen in prominence and now haunts public health professionals with nightmares of creeping obesity and diabetes. 

## Project Setup

**Prerequisites:** Node.js ≥ 18, pnpm ≥ 9, PostgreSQL running locally.

```sh
# 1. Install dependencies
pnpm install

# 2. Create a local .env file from the example
cp .env.example .env

# 3. Edit .env and set SESSION_SECRET to any long random string.
#    Adjust DATABASE_URL if your Postgres instance isn't at localhost:5432.

# 4. Create the database
createdb cookie-monsters

# 5. Start the dev server (runs on http://localhost:1337 by default)
pnpm start
```

**Environment variables** (see [.env.example](.env.example) for the full list):

| Variable | Required | Default | Description |
|---|---|---|---|
| `SESSION_SECRET` | **yes** | — | Secret key used to sign the session cookie |
| `DATABASE_URL` | no | `postgres://localhost:5432/cookie-monsters` | PostgreSQL connection string |
| `DATABASE_NAME` | no | `cookie-monsters` | Database name (overrides the name in `DATABASE_URL`) |
| `PORT` | no | `1337` | HTTP port |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | no | — | Enables Facebook OAuth login |
| `GOOGLE_CONSUMER_KEY` / `GOOGLE_CONSUMER_SECRET` | no | — | Enables Google OAuth login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | no | — | Enables GitHub OAuth login |

## Built with love using
* Node.js
* Postgres
* Sequelize
* Express
* Passport
* React
* Redux
* Webpack
* Mocha
* Chai
* And so much more!

## Authors

* Evan DiGiambattista
* Rachel Bird
* Sean McBride
