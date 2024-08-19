import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests




// Add a daily transaction
export const addDailyTransaction = createAsyncThunk(
  'dailyTransactions/add',
  async (transactionData, { rejectWithValue }) => {
   console.log(transactionData);
    try {
      const response = await axios.post(
        'http://localhost:3002/api/DailyTransactions',
        transactionData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all daily transactions
export const fetchDailyTransactions = createAsyncThunk(
  'dailyTransactions/fetchDailyTransactions',
  async ({
    page = 1,
    limit = 10,
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
  }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/DailyTransactions?page=${page}&limit=${limit}&year=${year}&month=${month}`);
      const data = await response.json();
      return {
        data: data.data,
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
        total: data.pagination.total,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch transactions');
    }
  }
);

// Update a daily transaction by id
export const updateDailyTransaction = createAsyncThunk(
  'dailyTransactions/update',
  async ({ id, transactionData }, { rejectWithValue }) => {

    try {
      const response = await axios.put(
        `/api/DailyTransactions/${id}`,
        transactionData,
           {
        withCredentials: true,
        
    }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a daily transaction by id
export const deleteDailyTransaction = createAsyncThunk(
  'dailyTransactions/delete',
  async (id, { rejectWithValue }) => {
  
    try {
      await axios.delete(`/api/DailyTransactions/${id}`, {
        
            withCredentials: true,
            
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);