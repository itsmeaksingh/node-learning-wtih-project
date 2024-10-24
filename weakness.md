# Need to work before next company

1. Angular Login using the backend/Node (flow clear)  [backend-done]
2. Angular Login to AWS cognito identity pool
3. login through google/ms/fb etc
4. payment method strip etc.
5. google map integration on ui.
6. we socket toking as chat.
7. component store use in the crud. [done]

# Data structure and Algorithms prepare

1. Complete all videos
2. just revise all the concept by the reading code(1 day need)
3. start practice the code by solving the SDA Love Babbar sheet.

# prepare interview

1. Just revise angular (1 day)q 
2. Prepare for interview question like (why should i hire you) etc

<!-- target till august -->
<!-- now you are ready -->

<!-- angular learning -->

# Project starting Flow:

- ng new project_name
- we can add aws script file [deploy.sh, deploy-uat.sh, deploy-prod.sh]

<!-- install the eslint first -->

- Add 3 eslint file in src [.eslintrc.json, .prettierignore, .prettierrc.json]

- ## Angular.json changes for env:

  - add cli:
    "cli": {
    "analytics": "889afa37-5248-4fb4-a6dd-68853a1327b7",
    "defaultCollection": "@angular-eslint/schematics"
    },
  - add schematics:
    "@schematics/angular:application": {
    "strict": true
    }
  - Add build env for UAT and dev[reverse the true/false], also remove the prod configuration, [refer the angular file]
    "development": {
    "buildOptimizer": false,
    "optimization": false,
    "vendorChunk": true,
    "extractLicenses": false,
    "sourceMap": true,
    "namedChunks": true
    },
    "uat": {
    "fileReplacements": [
    {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.uat.ts"
    }
    ],
    "buildOptimizer": false,
    "optimization": false,
    "vendorChunk": true,
    "extractLicenses": false,
    "sourceMap": true,
    "namedChunks": true
    }

- Package file changes

  - devDependencies [npm i --save-dev package_name] [npm i -D package_name]

    - es lint configuration link : [https://dev.to/gsarciotto/migrating-and-configuring-eslint-with-angular-11-3fg1]
    - run --> ng add @angular-eslint/schematics
    - run --> npm install -D prettier eslint-config-prettier eslint-plugin-prettier
    - remove "tslint", "ts-node"
    - update the eslintrc file according to shared file
    - automatically added
      - "@angular-eslint/builder": "12.7.0",
      - "@angular-eslint/eslint-plugin": "12.7.0",
      - "@angular-eslint/eslint-plugin-template": "12.7.0",
      - "@angular-eslint/schematics": "12.7.0",
      - "@angular-eslint/template-parser": "12.7.0",
      - "@typescript-eslint/eslint-plugin": "^5.30.6",
      - "@typescript-eslint/parser": "^5.30.6",
      - "@ngrx/component-store": "^12.5.1",
      - "eslint": "^7.26.0",
      - "eslint-config-airbnb-typescript": "^17.0.0",
      - "eslint-config-prettier": "^8.5.0",
      - "eslint-plugin-import": "^2.26.0",
      - "eslint-plugin-jsdoc": "^39.3.3",
      - "eslint-plugin-prefer-arrow": "^1.2.3",
      - "eslint-plugin-prettier": "^4.2.1",

  - Dependencies [npm i package_name]
    - npm i @ngrx/component-store@11.1.1 [according to your angular version]
    - ng add @angular/material

- material add [ng add @angular/material] same version automatically install for you [compatible version angular 11, material 11]
- component store --> you can check : [https://www.npmpeer.dev/packages/@ngrx/component-store/compatibility], for angular 11.0.0, component-store 11.1.1

- .gitignore
  <!-- # lock.json -->
  <!-- .angular/ -->
  <!-- package-lock.json -->

- Command
  - ng g g guard/auth
  - ng g m modules/auth/auth --routing

<!-- Structure -->

/\*

    folder structure:
        - app
            - guard
                - auth.guard
            - modules
                - auth
                    - components
                        - forgot-password
                        - login
                        - reset-password
                        - sign-up
                    - services
                        - auth.service
                    - auth-routing
                    - auth.module

                - dashboard
                    - dashboard
                    - services
                        - dashboard.service
                    - dashboard.routing
                    - dashboard.module

                - login
                    - login
                    - login.module

                - welcome
                    - data
                    - header
                    - services
                    - side-nev
                    - welcome
                - welcome.routing
                - welcome.module

                - users
                    - components
                        - add-user
                        - user-list
                    - user.routing
                    - user.module

            - shared
                - search
                - services
                - shared.module

            - angular material module
            - app-routing
            - app module

\*/
