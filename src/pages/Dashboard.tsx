import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";

interface DashboardLoaderData {
    userName: string;
}

export function dashboardLoader(): DashboardLoaderData {
    const userName = fetchData("userName");
    return { userName }
}

export const dashboardAction = async ({request} : {request: Request}) => {
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName}`);
    }
    catch(e: unknown) {
        throw new Error("There was a problem creating your account.");
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData() as DashboardLoaderData
    return (
        <>
            {userName ? (<p>{userName}</p>) : <Intro/> }
        </>
    )
}

export default Dashboard