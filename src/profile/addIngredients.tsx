import React, { useState } from 'react'
// import  from '@mui/material/pa;
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import iSnackbar from '../interfaces/iSnackbar';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


import '../static/profile/add-ingredient.css';
import api from '../api/axios';
import Loader from '../reusabale-components/loader';
import { SnackbarComp } from '../reusabale-components/snackbar-alert';

const ADD_INGREDIENT_URL = '/add-ingredient';
const UPLOAD_IMAGE_URL = '/utils/upload-image';

export default function AddIngredient () {

  const user_id = Number(localStorage.getItem('userId'));
  const [ingredientname, setIngredientName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const [isDataLoading, setIsDataLoading] = useState(false);

  const [snackbarDetails, setSnackbarDetails] = useState<iSnackbar>({
    snackbarMsg: "",
    snackbarOpen: false,
    snackbarSeverity: "success"
  });

   const navigate = useNavigate();
  
   var timeout;

  const onClose = () => {
    setSnackbarDetails( {
        snackbarOpen: false,
        snackbarSeverity: "success",
        snackbarMsg: ""
    })
  };

  const handleAddIngredient = async e => {
    e.preventDefault();
    setIsDataLoading(true);
    setSnackbarDetails( {
        snackbarOpen: true,
        snackbarSeverity: "success",
        snackbarMsg: ""
    })
    clearTimeout(timeout)
    timeout = setTimeout(function () {
        setSnackbarDetails( {
            snackbarOpen: false,
            snackbarSeverity: "success",
            snackbarMsg: ""
        })      
    }, 10000)

    try {
        const response = await api.post(ADD_INGREDIENT_URL,
            JSON.stringify(
                 {
                    
                    name: ingredientname,
                    imageUrl: imageUrl,
                    userId: user_id 
                }),

            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        const myIngredients = response.data
        
        setIsDataLoading(false);

        setSnackbarDetails( {
            snackbarOpen: false,
            snackbarSeverity: "success",
            snackbarMsg: "Login Successful"
        });
        navigate('/my-profile');
    } catch(err) {
        setIsDataLoading(false);

        setSnackbarDetails( {
            snackbarOpen: false,
            snackbarSeverity: 'error',
            snackbarMsg: "Process Failed"
        });

        console.log(err);
    }

  }

  const handleUploadImage = async e => {
    e.preventDefault();
    
    setIsDataLoading(true);
    setSnackbarDetails( {
        snackbarOpen: true,
        snackbarSeverity: "info",
        snackbarMsg: ""
    })
    clearTimeout(timeout)
    timeout = setTimeout(function () {
        setSnackbarDetails( {
            snackbarOpen: false,
            snackbarSeverity: "success",
            snackbarMsg: ""
        })      
    }, 10000)

    if(!file) {
        console.warn('no inage selected');
        return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(UPLOAD_IMAGE_URL, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            }
        );  
        console.log('imageUrl',response.data)
        
        setImageUrl(response.data.url)

        setIsDataLoading(false);

        setSnackbarDetails( {
            snackbarOpen: false,
            snackbarSeverity: "success",
            snackbarMsg: "Login Successful"
        })

        setFile(null);

        } catch(err) {
        setIsDataLoading(false);

        setSnackbarDetails( {
            snackbarOpen: false,
            snackbarSeverity: 'error',
            snackbarMsg: "Process Failed"
        });

        console.log(err);
    }
  }

  const handleFileChange = (e) => {
        setFile(e.target.files[0]);
  };

    return (
        <> {isDataLoading ? <Loader /> :
            <div className='container-signin'>
                <div className='header-signin'>
                <div className='text'> Add An Ingredient </div>
                <div className='underline'></div>
                </div>

                <div className='inputs'>
                    <div className="image-section">

                        <div className="image-upload">
                            <div className='input'>
                                <FilePresentIcon className='micon' />
                                <input className='input-add-img' 
                                style={{display: 'flex', alignContent: 'center', color: 'rebeccapurple'}}
                                type="file" 
                                placeholder='add image'
                                onChange={handleFileChange}
                                />
                            </div>

                            <div className='submit-container'>
                                <Button className='upload-btn' variant='contained' disabled={!file} onClick={handleUploadImage}>
                                    Upload Image
                                </Button>
                            </div>
                        </div>
                        
                        {
                            imageUrl == '' ? <div></div> : 
                            <div className='image-success' style={{backgroundColor: "green"}}>
                                Image successfully uploaded
                            </div>
                        }

                    </div>
                

                    <div className='input'>
                        <SoupKitchenIcon className='micon'  />
                        <input type="text" 
                        placeholder='Ingredient name'
                        onChange={(e) => setIngredientName(e.target.value)}
                        />
                    </div>

                    <div className='submit-container'>
                        <Button className='submit' variant='contained' disabled={!ingredientname} onClick={handleAddIngredient}>
                            Add Ingredient
                        </Button>
                        {/* <div className="submit"  onClick={handleAddIngredient}>Add Ingredient</div> */}
                    </div>
                
                </div>

                <SnackbarComp open={snackbarDetails.snackbarOpen} snackbarmsg={snackbarDetails.snackbarMsg} 
                    snackbarseverity={snackbarDetails.snackbarSeverity} onClose={onClose} />
            </div> 
            }
        </>
    )
}