# VICE – Dev Log

## Day 1
Error: `src refspec main does not match any`  
Fix: Made initial commit before pushing to remote

## Day 2
Error: npm dev script missing + conflicting module types  
Fix: Cleaned package.json, added dev script, enforced ES modules

## Day 3
Error: Forgot to go inside server directory before trying to run the server.js file. 
Fix: — cd server | Understood that browser also requests for favicon while postman does not do that. 

## Day 4

**Issue**
Node crashed: Cannot find module `server/index.js` after restructuring.

**Fix**
Updated `package.json` entry point and scripts to use `src/server.js`.  
Moved all backend folders inside `src` and added `app.listen()` in `server.js`.

## Day 5

**Issue**
Hardcoded port in server entry.

**Fix**
Added dotenv, moved port to `.env`, and loaded env vars before starting server.

## Day 6

**Issue**
Needed persistent database connection.

**Fix**
Created MongoDB Atlas cluster, stored URI in `.env`, and connected backend using Mongoose.

## Day 7

NA

## Day 8: 

Fixed mongoose pre-save middleware by switching to async promise-based hook without next().

## Day 9 

Added JWT logic, added login controller and tested on postman. 

## Day 10:

Implemented JWT auth middleware.
Learned how tokens are verified and how protected routes work using req.user.
