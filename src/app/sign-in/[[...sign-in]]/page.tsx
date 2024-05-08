import { SignUp } from "@clerk/nextjs";
import styles from "./page.module.css";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-no-repeat bg-center bg-gray-200">
            <div className="bg-white bg-opacity-75 p-8 rounded-md shadow-lg">
                <SignUp />
            </div>
        </div>
    );
}
