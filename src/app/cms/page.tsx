import {DashboardWithNavigation} from "@/components/demo/dashboard-with-navigation";
import {Poppins} from "next/font/google";

const poppins = Poppins({
    weight: ["400", "300"], // Roboto Condensed has multiple weights
    subsets: ["latin"],
});
export default function Cms() {
    return (
        <div className={`${poppins.className} `} >

        <DashboardWithNavigation/>
        </div>
    );
}
