// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const  initialState={
  UploadDoc: [  
  ],
  progress : 0
}

export const UploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadDocData: (state, action) => {
      state.UploadDoc = [...action.payload]
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetUploadData: (state)=>{      
      Object.assign(state, initialState)
    } 
  },
  
})

export const { uploadDocData, resetUploadData, setProgress } = UploadSlice.actions

export default UploadSlice.reducer
