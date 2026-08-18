import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import AppRoutes from "./routes/AppRoutes";

import { Toaster } from "react-hot-toast";


function App() {

    return (

        <ThemeProvider>

            <AuthProvider>

                <Toaster
                    position="top-right"
                />

                <AppRoutes />

            </AuthProvider>

        </ThemeProvider>

    );

}


export default App;