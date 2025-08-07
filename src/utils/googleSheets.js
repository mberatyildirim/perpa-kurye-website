// Google Sheets utility functions for sending form data
// This file contains functions to send data to Google Sheets via Google Apps Script

// Google Apps Script Web App URL - Bu URL'yi Google Apps Script'ten alacaksınız
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'

// Function to send data to Google Sheets
export const sendToGoogleSheets = async (data) => {
  try {
    // Add timestamp to data
    const dataWithTimestamp = {
      ...data,
      timestamp: new Date().toLocaleString('tr-TR'), // Turkish timestamp
      date: new Date().toISOString().split('T')[0] // Date only
    }

    // Send data to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithTimestamp)
    })

    if (response.ok) {
      console.log('✅ Data sent to Google Sheets successfully')
      return true
    } else {
      console.error('❌ Failed to send data to Google Sheets')
      return false
    }
  } catch (error) {
    console.error('❌ Error sending data to Google Sheets:', error)
    return false
  }
}

// Function to send courier form data
export const sendCourierData = async (formData) => {
  const data = {
    serviceType: 'Kurye',
    alinacakSemt: formData.alinacakSemt || '',
    teslimEdilecekSemt: formData.teslimEdilecekSemt || '',
    paketBoyutu: formData.paketBoyutu || '',
    aracTuru: formData.aracTuru || '',
    paketTuru: formData.paketTuru || '',
    source: 'Courier Form'
  }

  return await sendToGoogleSheets(data)
}

// Function to send pharmacy service data
export const sendPharmacyData = async (serviceTitle) => {
  const data = {
    serviceType: serviceTitle,
    alinacakSemt: '',
    teslimEdilecekSemt: '',
    paketBoyutu: '',
    aracTuru: '',
    paketTuru: '',
    source: 'Services Page'
  }

  return await sendToGoogleSheets(data)
}

// Function to send valet service data
export const sendValetData = async (serviceTitle) => {
  const data = {
    serviceType: serviceTitle,
    alinacakSemt: '',
    teslimEdilecekSemt: '',
    paketBoyutu: '',
    aracTuru: '',
    paketTuru: '',
    source: 'Services Page'
  }

  return await sendToGoogleSheets(data)
}

// Function to send hero form data
export const sendHeroData = async (formData) => {
  const data = {
    serviceType: 'Hero Form',
    alinacakSemt: formData.alinacakSemt || '',
    verilecekSemt: formData.verilecekSemt || '',
    paketBoyutu: formData.paketBoyutu || '',
    kuryeTipi: formData.kuryeTipi || '',
    source: 'Hero Form'
  }

  return await sendToGoogleSheets(data)
} 