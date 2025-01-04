import Login from "./Login.js";
import Browse from "./Browse.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase.js";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {createBrowserRouter} from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice.js";

const Body = () => {
    //define all the hooks on top
    const dispatch = useDispatch();
    //creating routing
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            } else {
              // User is signed out
              dispatch(removeUser());
            }
          });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;