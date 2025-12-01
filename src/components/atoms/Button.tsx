import { Button as MuiButton, ButtonProps, CircularProgress } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
    loading?: boolean;
}

export function Button({ loading, children, disabled, variant, ...props }: CustomButtonProps) {
    const isPrimary = variant === "contained";
    const isOutlined = variant === "outlined";

    return (
        <MuiButton
            disabled={disabled || loading}
            variant={variant}
            sx={{
                ...(isPrimary && {
                    backgroundColor: '#1C4E4E',
                    '&:hover': {
                        backgroundColor: '#133838',
                    },
                }),
                ...(isOutlined && {
                    borderColor: '#1C4E4E',
                    color: '#1C4E4E',
                    '&:hover': {
                        borderColor: '#133838',
                        backgroundColor: 'rgba(28, 78, 78, 0.04)',
                    },
                }),
            }}
            {...props}
        >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
    );
}