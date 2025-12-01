"use client";

import { useState } from "react";
import { Box, Popover, IconButton } from "@mui/material";
import { Palette } from "@mui/icons-material";

interface ChartColorPickerProps {
    colors: string[];
    onChange: (colors: string[]) => void;
}

const PRESET_COLORS = [
    "#1C4E4E", "#2A6B6B", "#3D8888", "#50A5A5", "#63C2C2",
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
];

export function ChartColorPicker({ colors, onChange }: ChartColorPickerProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedIndex(null);
    };

    const handleColorSelect = (color: string) => {
        if (selectedIndex !== null) {
            const newColors = [...colors];
            newColors[selectedIndex] = color;
            onChange(newColors);
        }
        handleClose();
    };

    const open = Boolean(anchorEl);

    return (
        <Box className="flex items-center gap-2 mb-2">
      {colors.map((color, index) => (
          <Box
              key={index}
              onClick={(e) => {
                  setSelectedIndex(index);
                  setAnchorEl(e.currentTarget as unknown as HTMLButtonElement);
              }}
              sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: color,
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "2px solid #fff",
                  boxShadow: "0 0 0 1px #ddd",
                  "&:hover": {
                      transform: "scale(1.1)",
                  },
              }}
          />
      ))}
            <IconButton size="small" onClick={handleClick}>
        <Palette fontSize="small" />
      </IconButton>

      <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
          }}
      >
        <Box className="p-2 grid grid-cols-5 gap-1" sx={{ width: 160 }}>
          {PRESET_COLORS.map((color) => (
              <Box
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: color,
                      borderRadius: "4px",
                      cursor: "pointer",
                      "&:hover": {
                          transform: "scale(1.1)",
                      },
                  }}
              />
          ))}
        </Box>
      </Popover>
    </Box>
    );
}