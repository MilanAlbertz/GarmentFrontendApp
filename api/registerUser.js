import React, { useState } from 'react';

export async function RegisterUser(userID) {
  try {
    // Make a call to your API to register the user using the fetch API
    const apiUrl = `http://localhost:5256/api/User/RegisterUser?userID=${userID}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in RegisterUser:', error.message);
  }
}