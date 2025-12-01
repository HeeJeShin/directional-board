import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type InputProps = TextFieldProps & {
    error?: boolean;
    helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <TextField
            inputRef={ref}
            fullWidth
            size="small"
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#E5E5E5',
                    },
                    '&:hover fieldset': {
                        borderColor: '#1C4E4E',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1C4E4E',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#1C4E4E',
                },
            }}
            {...props}
        />
    );
});

Input.displayName = "Input";