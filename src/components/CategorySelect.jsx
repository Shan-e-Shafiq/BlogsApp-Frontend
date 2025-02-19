import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function CategorySelect({ Category, setCategory }) {

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Category}
                    label="Category"
                    name='category'
                    onChange={handleChange}
                >
                    <MenuItem value={"All"} selected>All</MenuItem>
                    <MenuItem value={"General"}>General</MenuItem>
                    <MenuItem value={"News"}>News</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Technology"}>Technology</MenuItem>
                    <MenuItem value={"Economy"}>Economy</MenuItem>
                    <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
















// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useLocation } from 'react-router-dom';


// export default function CategorySelect(props) {

//     const location = useLocation()
//     const isFormComponent = location.pathname.includes("post-blog") || location.pathname.includes("edit-blog")
//     const [Category, setCategory] = isFormComponent ? useState('') : [props.Category, props.setCategory]

//     const handleChange = (event) => {
//         setCategory(event.target.value);
//     };

//     return (
//         <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">{isFormComponent ? "Category *" : "Category"}</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={Category}
//                     label="Category"
//                     name='category'
//                     onChange={handleChange}
//                     required={isFormComponent}
//                 >
//                     {
//                         isFormComponent ? null : <MenuItem value={"All"}>All</MenuItem>
//                     }
//                     <MenuItem value={"General"}>General</MenuItem>
//                     <MenuItem value={"News"}>News</MenuItem>
//                     <MenuItem value={"Sports"}>Sports</MenuItem>
//                     <MenuItem value={"Technology"}>Technology</MenuItem>
//                     <MenuItem value={"Economy"}>Economy</MenuItem>
//                     <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
//                 </Select>
//             </FormControl>
//         </Box>
//     );
// }

