import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBugdetForm";

interface DashboardLoaderData {
    userName: string;
    budgets: number;
}

export function dashboardLoader(): DashboardLoaderData {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets };
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
            {userName ? 
                (
                    <div className="dashboard">
                        <h1>Welcome back, <span className="accent">{userName}</span></h1>
                        <div className="grid-sm">
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Intro/> 
            }
        </>
    )
}

export default Dashboard