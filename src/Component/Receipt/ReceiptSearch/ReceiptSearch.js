import { React, useState } from "react";
import TextField from "@mui/material/TextField";

function ReceiptSearch() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <h1>React ReceiptSearch</h1>
      <div className="ReceiptSearch">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="ReceiptSearch"
        />
      </div>
    </div>
  );
}

export default ReceiptSearch;