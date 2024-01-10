import History from "./History";
import Navigator from "../navigation/Navigator";

export default function Profile() {
    return (
        <>
            <div>
                <Navigator />
            </div>
            <div>
                <a> History </a> 
                <History /> 
            </div>
        </>
    );
}