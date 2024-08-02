import {FC, useState} from "react";
import ModalForm from "../modal/ModalForm.tsx";
import styles from './LoginForm.module.css';
import Visibility from "../visibility/Visibility.tsx";
import VisibilityOff from "../visibility/VisibilityOff.tsx";
import Google from "../social-buttons/Google.tsx";
import {doSignInWithEmailAndPassword, doSignInWithGoogle} from "../../firebase/Auth.ts";
import toast from "react-hot-toast";
import RegisterForm from "../register-form/RegisterForm.tsx";

interface LoginFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginForm: FC<LoginFormProps> = ({isOpen, onClose}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const SignUpWithGoogle = async () => {
        await doSignInWithGoogle().then(() => {
            toast.success("Logged in successfully!");
            onClose();
        })
    };
    /*const SignUpWithGithub = async () => {
        await doSignInWithGithub().then(() => {
            toast.success("Logged in successfully!");
            onClose();
        })
    };*/
    const handleSignUp = async (event: any) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all the fields!");
            return;
        }
        const res = await doSignInWithEmailAndPassword(
            email, password
        )
        if (res) {
            toast.success("Logged in successfully!");
            onClose();
        }
    }
    return (
        <>
            {
                redirectToRegister ?
                    <RegisterForm isOpen={true} onClose={() => {
                        setRedirectToRegister(false)
                        onClose();
                    }}/>
                    :
        <ModalForm isOpen={
            isOpen
        } onClose={() => {
            onClose();
        }}
                   headerChildren={<h1 className={styles.title}>
                       Log In
        </h1>
        }
                   contentClassName={styles.content}
                   bodyClassName={styles.body}
                   closeButton={true}
                   closeOnOverlayClick={false}
                   closeOnEsc={false}
                  >
            <form className={styles.form}>
                <div className={styles.input_group}>
                <label className={styles.input_label}> Email address
                <input type="email" placeholder="Enter your email"  className={styles.input}
                          value={email} onChange={(event) => setEmail(event.target.value)}/>
                </label>
                <label className={styles.input_label}> Password
                    <div className={styles.password_input_container}>
                <input type={
                    isPasswordVisible ? "text" : "password"
                } placeholder="Enter your password"  className={styles.input}
                          value={password} onChange={(event) => setPassword(event.target.value)}/>
                    {isPasswordVisible ?
                        <Visibility onClick={() => setIsPasswordVisible(!isPasswordVisible)}  className={styles.visibility}/> :
                    <VisibilityOff onClick={() => setIsPasswordVisible(!isPasswordVisible)}  className={styles.visibility} />}
                        </div>
                </label>
                </div>
                <button type="submit" className={styles.submit_button}
                        onClick={handleSignUp}
                >Log In</button>
                <div className={styles.seperator}>
                    <span className={styles.seperator_line}/>
                    <span className={styles.seperator_text}>or</span>
                    <span className={styles.seperator_line}/>
                </div>
                <div className={styles.social_buttons}>
                <button type="button" className={styles.social_button}
                        onClick={SignUpWithGoogle}
                > <Google className={styles.google_icon}/>
                    Sign up with Google</button>
                {/*<button type="button" className={styles.social_button}
                        onClick={SignUpWithGithub}
                > <Github className={styles.github_icon}/>
                    Sign up with Github</button>*/}
                </div>
                <div className={styles.footer}>
                    <span>Don't have an account?</span>
                    <button type="button" className={styles.footer_button} onClick={() => setRedirectToRegister(true)}>Sign up</button>
                </div>
            </form>
        </ModalForm>
            }
        </>
    );
}

export default LoginForm;