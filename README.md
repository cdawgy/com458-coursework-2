# com458-coursework-2

## Unit Testing Branch

This branch will contain all the test coverage for each JS file.
This code will never be merged with `main` branch but `main` will be merged in here to get latest code updates.

### How to use

To use this branch you simply run an npm install command from the command line.
`npm install` - this should work within your terminal, either Powershell (Windows) or Bash (Mac).

`npm install` should only be ran once to bring in dependencies.
Each time you want to test your unit tests execute the following in the terminal:
`npm test`

This will print out in the terminal the code coverage of all the files.

Once you run this command it will generate a `coverage` folder.
Open the following HTML page in your browser to visualise the code coverage.
_coverage/Icov-report/index.html_
