# Contributing to Force

This project is work of [many developers](https://github.com/artsy/force/graphs/contributors).

For an overview of our current best practices, see [this doc](https://github.com/artsy/force/blob/main/docs/best_practices.md).

For an architecture overview (as of July 2021), see [this video](https://drive.google.com/drive/folders/1RE_7j4hocKD51RVZy60_5rZqUk9T-Zc2).

We accept [pull requests](https://github.com/artsy/force/pulls), and you may [propose features and discuss issues](https://github.com/artsy/force/issues).

## Setup Instructions

> ⚠️ If you're an Artsy Engineer, be sure to run the [general setup script](https://github.com/artsy/potential/blob/main/scripts/setup) located in [Potential](https://github.com/artsy/potential) first.

Clone the [project on GitHub](https://github.com/artsy/force) and cd in:

```sh
git clone git@github.com:artsy/force.git && cd force
```

Execute the setup script:

```sh
./scripts/setup.sh
```

Start the server:

```sh
yarn start
```

Force should now be running at [http://localhost:4000/](http://localhost:4000/).

## Run the tests

```sh
yarn type-check
yarn jest
```

## Running a local copy of Force in Production mode

```sh
yarn start:prod
```

This creates a production-ready bundle of client and server-side code and boots the server. (This will take a while to compile.)

In case you want to ease debugging the server-side code, you can set the `DEBUG`
environment variable to disable webpack optimizations.

```sh
env DEBUG=true yarn start:prod
```

<details>
   <summary>Do you see an error about not providing a secure connection?</summary>

Your browser has probably cached a redirect to `https://...`. Clear your browser cache for this page:

- Browse to the failing page
- Open Chrome Dev Tools (this adds a drop down menu to the reload icon)
- Click and hold “Reload” icon until the drop down appears.
- Select “Empty Cache and Hard Reload”
- You may now browse successfully to the page
</details>

## Creating a Review App

See [the docs](docs/creating_review_app.md).

## Create a Topic Branch

Make sure your fork is up-to-date and create a topic branch for your feature or bug fix.

```sh
git checkout main
git pull upstream main
git checkout -b my-feature-branch
```

## Write Tests

Write tests for all new features and fixes using Jest. Run all tests with `yarn test` and be sure to include `.jest` in the filename so that the test-runner knows what to look for.

To speed up your workflow try watching an individual file or directory for changes, e.g. `yarn jest --watch src/Components/Authentication`

## Write Code

We definitely appreciate pull requests that highlight or reproduce a problem, even without a fix.

Implement your feature or bug fix.

## Commit Changes

Make sure git knows your name and email address:

```sh
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```

Prefix your branch with your Github username:

```sh
git checkout -b <username>/branch-name
git add .
git commit -m 'Some descriptive commit message'
```

At this point a [series of githooks](https://github.com/artsy/force/blob/f549353687203e0bd0abfe5239a8509d66e53fb2/package.json#L375-L381) will run via [Husky](https://github.com/typicode/husky) to ensure staged code is free of linting errors and is formatted properly with Prettier. If all good, then run

```sh
git push
```

This will then run `yarn type-check` to ensure that type-errors aren't committed upstream, which in turn will prevent unnecessary CI churn when working on a feature. (The reason we run type-checking before `git push` (vs `git commit`) is that it's common for developers to create temporary `wip` commits, which often contain type errors.)

> NOTE: For those who prefer to **not** use our git-hooks workflow, you can easily opt out by prefixing `HUSKY_SKIP_HOOKS=1` to executed commands, or by using `--no-verify`. To opt out globally, add this env var to your `.bashrc` (or related).

## Make a Pull Request

Go to https://github.com/artsy/force and select your branch.
Click the 'Pull Request' button and fill out the form. Pull requests are usually reviewed within a few days.

## Check on Your Pull Request

Go back to your pull request after a few minutes and see whether it passed muster with Circle. Everything should look green, otherwise fix issues and amend your commit as described above.

## Be Patient

It's likely that your change will not be merged and that the nitpicky maintainers will ask you to do more, or fix seemingly benign problems. Hang in there!

## Thank You

Please do know that we really appreciate and value your time and work. We love you, really. <3
