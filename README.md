
# README

This README would normally document whatever steps are necessary to get the
application up and running.

Current worklist:

- [x] Devise
    - [x] Install gem
    - [x] Find devise setup steps
      - [x] Write them down right in here
      - https://github.com/heartcombo/devise#starting-with-rails
    - [x] Run through vanilla rails devise setup
    - [x] Confirm login stuff is working
        - [x] fCreate user
        - [x] Login
        - [x] Hide reset password for now
- [ ] react-devise
    - [ ] Install npm thinger
    - [ ] Make sure my dependencies are still working ok
    - [ ] Run through setup steps in tutorial
        - [ ] https://github.com/timscott/react-devise/wiki
    - [ ] Debug
        - [ ] Create user
        - [ ] Login
        - [ ] bad create
        - [ ] bad login
- [ ] No dice with default devise
  - [x] Try this one
    - https://medium.com/@mazik.wyry/rails-5-api-jwt-setup-in-minutes-using-devise-71670fd4ed03
  - [x] Build some RN pieces
    - [x] Simple login page
      - [x] Wire into JWT Devise
  - [ ] Fix RN Nav
    - [x] patch back in index page
    - [x] put together nav bar
    - [x] if not authed, redirect to login
    - [ ] Registration page
      - [ ] Wire into JWT Devise plz
    - [ ] Reset password page
  - [ ] Check this devise business
    - [ ] Am I logged in?
    - [ ] Do I need a jwt, or is this happening on the session level?
    - [x] Redirect to login on bad auth
      - [x] programmatic redirect on auh callback
      - [x] detect unauthorized callback
      - [ ] pass login redirect url as param to login page
        - [ ] if present, on successful login send them back where they were
        - [ ] if not present, send them to root view
    - [ ] Form roundup
        - [ ] Error messages looking nice
        - [ ] Get my form containers padding/margin right
- fix user settings page
  - email
    - password
- login page style
    - cop the styler thing
- reset password thing
    - send an email
- song index
    - red/yellow/blue on status
- show song page
  - Make it look nicer
  - add in edit button linking to update page
- song update page
    - status
    - last played
- formik up my registration page
- Test out this registration -> jwt login type business, seems like it isn't adding in my header the
way I wanted
- Set up nav to get to songs from top bar