import React, { useState } from 'react';

export async function LikeGarment(garmentID, userID) {
  try {
    const apiUrl = 'http://localhost:5256/api/Garment/StoreLikedGarmentToUser?garmentId='+garmentID+'&userId='+userID;
    const response = await fetch(apiUrl, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in LikeGarment:', error.message);
  }
}