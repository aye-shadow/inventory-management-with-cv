'use client'
import React from 'react';
import OpenAI from "openai";
import axios from 'axios';

export default function APIButton() {
  async function classifyImage(photoUrl) {
    
  }

  return (
    <button
      onClick={() =>
        classifyImage(
          "https://www.thepaperworm.com/cdn/shop/products/7_O1CN01wLj0A41eDqmxSAB4a__2960883838-0-cib_1024x1024.jpg?v=1704363254"
        )
      }
    >
      Classify Image
    </button>
  );
}
