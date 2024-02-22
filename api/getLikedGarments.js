import React, { useState } from 'react';

export async function GetLikedGarments(userID) {
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5256/api/Garment/likedgarments?userId='+userID);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
      };
      return await fetchData();
}
