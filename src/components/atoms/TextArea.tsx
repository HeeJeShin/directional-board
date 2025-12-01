import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type TextAreaProps = TextFieldProps & {
    error?: boolean;
    helperText?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        return (
            <TextField
                inputRef={ref}
                fullWidth
                multiline
                rows={6}
                {...props}
            />
        );
    }
);

TextArea.displayName = "TextArea";