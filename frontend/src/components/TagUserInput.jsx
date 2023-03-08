import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.2rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#d9d9d9",
      }}
    >
      <Stack direction='row' gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export const TagUserInput = (props) => {
  const [tags, setTags] = useState([]);
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newTags = tags.filter((val) => val !== value);
    setTags(newTags);
  };
  /* userCost:
        itemName: [user1, user2, etc.] 
        itemName2: [user1, user2, etc. ]
  */

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!tags.includes(tagRef.current.value )) {
        setTags([...tags, tagRef.current.value]);

        // every time you add a new user to an item, you need to update the cost of this item for all users
        if (!(tagRef.current.value in props.userCost)) {
          let newValue = 0;
          let currItem = tagRef.current.value;
          props.setUserCost({
            ...props.userCost,
            
            [currItem]: newValue // need the brackets for dynamic assignment
          })
        }
        else {
          let newValue = props.userCost[tagRef.current.value] + 4;
          let currItem = tagRef.current.value;
          props.setUserCost({
            ...props.userCost,
            [currItem]: newValue // need the brackets for dynamic assignment
          })
        }
        console.log(props.userCost)
    }
    else {
        alert(tagRef.current.value + " was already added to this item");
    }
    tagRef.current.value = "";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          variant='standard'
          size='small'
          sx={{ margin: "1rem 0" }}
          margin='none'
          placeholder={tags.length < 5 ? "Enter tags" : ""}
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })}
              </Box>
            ),
          }}
        />
      </form>
    </Box>
  );
}

export default TagUserInput;