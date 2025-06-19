import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  file1: FileList;
  file2: FileList;
  file3: FileList;
};

function FileUploadForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const validSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    navigate("/success");
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(validSubmit)}
      >
        <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center" }}>
          Upload Files
        </Typography>

        {/* File Input 1 */}
        <input
          type="file"
          style={{ margin: "20px 0" }}
          {...register("file1", { required: "File 1 is required" })}
        />
        {errors.file1 && (
          <Typography color="error" style={{ marginBottom: "10px" }}>
            {errors.file1.message}
          </Typography>
        )}

        {/* File Input 2 */}
        <input
          type="file"
          style={{ margin: "20px 0" }}
          {...register("file2", { required: "File 2 is required" })}
        />
        {errors.file2 && (
          <Typography color="error" style={{ marginBottom: "10px" }}>
            {errors.file2.message}
          </Typography>
        )}

        {/* File Input 3 (Fixed Key) */}
        <input
          type="file"
          style={{ margin: "20px 0" }}
          {...register("file3", { required: "File 3 is required" })}
        />
        {errors.file3 && (
          <Typography color="error" style={{ marginBottom: "10px" }}>
            {errors.file3.message}
          </Typography>
        )}

        <Button
          type="submit"
          style={{ backgroundColor: "blue", color: "white", marginTop: "20px", width: "150px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FileUploadForm;
