import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";

interface DashboardLoaderData {
    userName: string;
}

export function dashboardLoader(): DashboardLoaderData {
    const userName = fetchData("userName");
    return { userName }
}

const Dashboard = () => {
    const { userName } = useLoaderData() as DashboardLoaderData
    return (
        <div>
            <h1>{userName}</h1>
            Dashboard
        </div>
    )
}

export default Dashboard