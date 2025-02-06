import { AppBar, Box, Button, Toolbar } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from "react-router-dom"; // Corrected to "react-router-dom"
import Link from '@mui/material/Link';

const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box>
                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        component={RouterLink}
                        to="/signup"
                    >
                        Sign Up
                    </Button>
                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<LoginIcon />}
                        component={RouterLink}
                        to="/login"
                    >
                        Log in
                    </Button>

                </Box>

                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>

                    <Link
                        underline="none"
                        color="inherit"
                        component={RouterLink}
                        to="/todos"
                    >
                        Todos
                    </Link>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Navbar;
