import React, { useState } from 'react';
import { Stack, Typography, TextField, FormControl, Select, InputLabel, MenuItem,Button} from '@mui/material';
import "./AddProduct.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function AddProduct() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [itemData, setItemData] = useState([]);

  const [showSubCategoryOptions, setShowSubCategoryOptions] = useState(false);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(Date.now()));
  const [endDate, setEndDate] = useState(null);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    let subCategories = [];
    if (selectedValue === '汽車') {
      subCategories = ['國產車', '進口車'];
    } else if (selectedValue === '電子產品') {
      subCategories = ['手機', '耳機', '電腦配件'];
    } else if (selectedValue === '名牌精品') {
      subCategories = ['皮夾', '包包'];
    }

    setSubCategoryOptions(subCategories);
    setShowSubCategoryOptions(subCategories.length > 0);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      const newItemData =  {
        imageUrl:imageUrl ,
        file :selectedFile
      }
      setItemData((prevItemData) => [...prevItemData, newItemData]);
    }
  };
  const handleClearImage = (Url) => {
    setItemData((prevItemData) =>
      prevItemData.filter((item) => item.imageUrl !== Url)
    );
  };
  const validateDescription = () =>{
    if (description != null){
      return description.length >= 10;}
  };

  const handleAdd =() =>{
    if(selectedCategory == null){
      alert("請輸入商品種類");
    }
    else if(selectedSubCategory == null){
      alert("請輸入子商品種類");
    }
    else if(!validateDescription()){
      alert("請輸入商品描述(大於10字)");
    }
    else if(price == null){
      alert("請輸入起標價");
    }
    else if (itemData.length == 0){
      alert("最少上傳一張照片");
    }
    else if(startDate == null || endDate == null ||startDate>endDate){
      if(startDate == null || endDate == null){
        alert("請輸入結標日和起標日")
      }
      else if(startDate>endDate){
        alert("結標日必須在起標日後");
      }
    }
    else{
      alert("新增商品成功");
    }  
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className='form-container'>
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Typography variant="h5">新增拍賣品</Typography>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="add-select-label">商品種類</InputLabel>
          <Select
            labelId="add-select-label"
            id="add-selector"
            value={selectedCategory}
            label = '商品種類'
            onChange={handleCategoryChange}
          >
            <MenuItem value="汽車">汽車</MenuItem>
            <MenuItem value="電子產品">電子產品</MenuItem>
            <MenuItem value="名牌精品">名牌精品</MenuItem>
          </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
          {showSubCategoryOptions && (
            <div>
              <InputLabel id="sub-category-label">子商品種類</InputLabel>
              <Select
                labelId="sub-category-label"
                id="sub-category-selector"
                onChange={(event ) => setSelectedSubCategory(event.target.value)}
              >
                {subCategoryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              </div>
          )}
          </FormControl>
          <FormControl variant="standard" fullWidth>

          <TextField
            label="起標價"
            type="number"
            id="price-input"
            InputProps={{ inputProps: { min: 0 } }} 
            variant="standard"
            onChange={(event) =>setPrice(event.target.value)}
            
          />          
          <TextField
            label="產品描述"
            multiline
            rows={4} 
            id="description"
            variant="standard"
            onChange={(event) =>setDescription(event.target.value)}

          />
          </FormControl>


          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            上傳照片
            <VisuallyHiddenInput type="file"accept=".jpg, .png, .tif, .gif" onChange={handleImageChange}/>
          </Button>
          {itemData[0] && (
            <ImageList sx={{ width: 400, height: 400 }}>
              {itemData.map((item) => (
                <ImageListItem key={item.imageUrl}>
                  <img
                    srcSet={`${item.imageUrl}`}
                  />
                  <ImageListItemBar
                    sx={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                      position="top"
                      actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        onClick = {()=>handleClearImage(item.imageUrl)}
                        >
                        <ClearIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>

          )}
          <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
            <DateTimePicker
              label="起標日"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <DateTimePicker
              label="結標日"
              value={endDate}
              defaultValue={dayjs(Date.now())}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        </div>
        <Button variant="contained" onClick={handleAdd} sx={{ width: 100}} startIcon={<PostAddIcon />}>上傳</Button>

      </Stack>
    </div>
  );
}
