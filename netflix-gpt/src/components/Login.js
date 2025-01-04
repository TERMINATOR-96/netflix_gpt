import Header from "./Header";
import {useState, useRef} from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {checkValidData} from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    //toggle sign in form on login page
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    //handleButtonClick function
    const handleButtonClick = () => {
        //validate the form data
        // console.log(email.current.value);
        // console.log(password.current.value);
        const message = checkValidData(email.current.value, password.current.value);
        // when message is null then it means that condition is successfully passed and nothing will show in console
        // console.log(message);
        setErrorMessage(message);
        if(message) return;
        //Sign In or Sign Up logic
        if(!isSignInForm){
            //Sign Up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/36603319?v=4"
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
                    navigate("/browse");
                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage);
            });
        } else {
            //Sign In logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg"
                    alt="background_image"
                />
            </div>
            <form 
                onSubmit = {(e) => e.preventDefault()}
                className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            > 
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input 
                        ref={name}
                        type="text"
                        placeholder="Enter full name"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input 
                    ref={email}
                    type="text" 
                    placeholder="Email or Phone number" 
                    className="p-4 my-4 w-full bg-gray-700" 
                />
                <input 
                    ref={password}
                    type="password" 
                    placeholder="Enter password" 
                    className="p-4 my-4 w-full bg-gray-700" 
                />
                {!isSignInForm && (
                    <input 
                        type="password"
                        placeholder="Confirm password"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <p className="text-red-500 font-bold text-lg py-2"> 
                    {errorMessage}
                </p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ?  "New to Netflix? Sign Up Now." : "Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    );
};

export default Login;