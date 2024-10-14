import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData } from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

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
    const {_action, ...values} = Object.fromEntries(data);
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        }
        catch(e: unknown) {
            throw new Error("There was a problem creating your account.");
        }
    }
    else if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget as string,
                amount: parseFloat(values.newBudgetAmount as string),
            })
            return toast.success("Budget created!");
        }
        catch(e: unknown) {
            throw new Error("There was a problem creating your budget.");
        }
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