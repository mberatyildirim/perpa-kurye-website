// Istanbul neighborhoods scraper script
// This script fetches data from the Atlas Big website and converts it to JSON format

// Import required Node.js modules for web scraping using ES module syntax
import https from 'https'; // Module for making HTTPS requests
import fs from 'fs'; // Module for file system operations

// Function to make HTTPS request and get HTML content
function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        // Create HTTPS request options
        const options = {
            hostname: 'atlasbig.com.tr',
            path: '/istanbulun-mahalleleri',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        // Make the HTTPS request
        const req = https.request(options, (res) => {
            let data = ''; // Variable to store the response data
            
            // Collect data chunks as they arrive
            res.on('data', (chunk) => {
                data += chunk; // Append each chunk to the data string
            });
            
            // When all data is received, resolve with the complete HTML
            res.on('end', () => {
                resolve(data); // Return the complete HTML content
            });
        });

        // Handle request errors
        req.on('error', (error) => {
            reject(error); // Reject the promise if there's an error
        });

        req.end(); // End the request
    });
}

// Function to parse the HTML and extract neighborhood data
function parseNeighborhoods(html) {
    const neighborhoods = []; // Array to store the extracted data
    
    // Find the table with id="data-table" and extract all table rows
    const tableRegex = /<table[^>]*id="data-table"[^>]*>.*?<tbody>(.*?)<\/tbody>/s;
    const tableMatch = html.match(tableRegex);
    
    if (!tableMatch) {
        console.log('❌ Could not find the data table in HTML'); // Log if table not found
        return neighborhoods;
    }
    
    const tbodyContent = tableMatch[1]; // Extract the tbody content
    
    // Regular expression to match table rows with neighborhood data
    // This regex looks for <tr> tags containing <td> elements
    const rowRegex = /<tr[^>]*>.*?<td[^>]*>([^<]+)<\/td>.*?<td[^>]*>([^<]+)<\/td>/gs;
    
    let match; // Variable to store regex matches
    
    // Loop through all matches in the tbody content
    while ((match = rowRegex.exec(tbodyContent)) !== null) {
        const mahalle = match[1].trim(); // Extract neighborhood name (first td)
        const ilce = match[2].trim(); // Extract district name (second td)
        
        // Skip empty entries and validate the data
        if (mahalle && ilce && 
            mahalle !== '' && 
            ilce !== '' && 
            !mahalle.includes('Mahalle') && 
            !ilce.includes('İlçe')) {
            
            // Add the neighborhood data to our array
            neighborhoods.push({
                mahalle: mahalle, // Neighborhood name
                ilce: ilce // District name
            });
        }
    }
    
    return neighborhoods; // Return the array of neighborhood objects
}

// Main function to orchestrate the scraping process
async function scrapeIstanbulNeighborhoods() {
    try {
        console.log('🔄 Fetching Istanbul neighborhoods data...'); // Log the start of the process
        
        // Fetch the HTML content from the website
        const html = await fetchHTML('https://atlasbig.com.tr/istanbulun-mahalleleri');
        
        console.log('📊 Parsing neighborhood data...'); // Log the parsing step
        
        // Parse the HTML to extract neighborhood data
        const neighborhoods = parseNeighborhoods(html);
        
        console.log(`✅ Found ${neighborhoods.length} neighborhoods`); // Log the number of neighborhoods found
        
        // Convert the data to JSON format
        const jsonData = JSON.stringify(neighborhoods, null, 2); // Pretty print with 2 spaces indentation
        
        // Write the JSON data to a file
        fs.writeFileSync('istanbul-neighborhoods.json', jsonData, 'utf8');
        
        console.log('💾 Data saved to istanbul-neighborhoods.json'); // Log successful save
        
        // Display first few entries as a preview
        console.log('\n📋 Preview of first 5 entries:');
        neighborhoods.slice(0, 5).forEach((item, index) => {
            console.log(`${index + 1}. ${item.mahalle} - ${item.ilce}`);
        });
        
    } catch (error) {
        console.error('❌ Error occurred:', error.message); // Log any errors that occur
    }
}

// Execute the main function
scrapeIstanbulNeighborhoods(); 