import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";
import wave from "../assets/wave.svg";
import Nav from "../components/Nav";

interface MainLoaderData {
    userName: string;
}

export function mainLoader(): MainLoaderData {
    const userName: string = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData() as MainLoaderData
    return (
        <div className="layout">
            <Nav userName={userName}/>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    )
}

export default Main