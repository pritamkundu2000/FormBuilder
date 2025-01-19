import { Outlet } from "react-router";
import { Store } from "./Store/Store";
import {Provider} from 'react-redux'
import Navbar from "./Components/NavBar";

const App=()=>{
    return(
        <div>
            <Provider store={Store}>
                <Navbar/>
                <Outlet/>
            </Provider>
        </div>
    )
}

export default App;