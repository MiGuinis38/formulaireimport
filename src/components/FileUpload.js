import React from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Icon, List } from "semantic-ui-react";

const FileUpload = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "text/plain"
  });

  const fileInputCallback = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      fetch("/addFile", {
        method: "POST",
        body: formData
      }).then((response) =>
        response.json().then((data) => {
          this.setState({ files: [...this.state.files, data] });
        })
      );
    });
  };

  return (
    <Dropzone onDrop={fileInputCallback}>
      {({ getRootProps, getInputProps }) => (
        <div
          className="ui center aligned secondary gray segment"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Icon name="cloud upload" size="big" />
          <div>Drag and drop or upload {props.dataType} file(s)</div>
        </div>
      )}
    </Dropzone>
  );
};

export default FileUpload;
