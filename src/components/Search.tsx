import { TextField } from "@mui/material";
import { SetStateAction } from "react";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

export default function Search({ search, setSearch }: SearchProps) {
  return (
    <TextField
      variant="outlined"
      value={search}
      label="Search Pokemon..."
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: "32px",
            borderColor: "none",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#F66B01",
          },
          backgroundColor: "#1E1E1E",
          borderRadius: "32px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F66B01",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255, 255, 255, 0.5)",
          transform: "translate(20px, 10px) scale(1)",
          "&.Mui-focused": {
            color: "#F66B01",
            transform: "translate(14px, -9px) scale(0.75)",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: "white",
          padding: "20px 24px",
        },
      }}
      className="w-full max-w-[600px]"
    />
  );
}
