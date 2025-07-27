import { Box } from '@mui/material';
import styles from './Layout.module.css';

function Layout({ children }) {
    return (
        <Box className={styles.container}>
            <Box className={styles.innerBlock}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout;