import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "./constants";
 
// Creating a Realm App Instance
const app = new App(APP_ID);
 
// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 
 // Function to log in user into our App Service app using their email & password
 const emailPasswordLogin = async (email, password) => {
   const credentials = Credentials.emailPassword(email, password);
   const authenticatedUser = await app.logIn(credentials);
   setUser(authenticatedUser);
   return authenticatedUser;
 };

 // Function to sign up user into our App Service app using their email & password
 const emailPasswordSignup = async (email, password) => {
   try {
     await app.emailPasswordAuth.registerUser(email, password);
      // return emailPasswordLogin(email, password);
      // The user is automatically confirmed and log in.
      const authenticatedUser = await emailPasswordLogin(email, password);
      return authenticatedUser;
   } catch (error) {
     throw error;
   }
 };
 
 
 // Function to prompt user to enter email for reset password link (with token and tokenID)
 const emailPasswordReset = async (email) => {
  try {
    await app.emailPasswordAuth.sendResetPasswordEmail({ email });
    return true;
  } catch (error) {
    throw error;
  }
};

// Function to prompt user to reset their password
const passwordReset = async (token, tokenId, password) => {
  try {
    await app.emailPasswordAuth.resetPassword(token, tokenId, password);
  } catch (error) {
    throw error;
  }
};

// Function to fetch the user (if the user is already logged in) from local storage
// so that we can use it in our app across different components.
 const fetchUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.refreshCustomData();
     setUser(app.currentUser);
     return app.currentUser;
   } catch (error) {
     throw error;
   }
 }
 
// Function to logout user from our App Services app
 const logOutUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.logOut();
     // Setting the user to null once loggedOut.
     setUser(null);
     return true;
   } catch (error) {
     throw error
   }
 }
 
 return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser, emailPasswordReset, passwordReset  }}>
   {children}
 </UserContext.Provider>;
}