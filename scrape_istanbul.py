import requests
from bs4 import BeautifulSoup
import json
import re

def scrape_istanbul_neighborhoods():
    url = "https://atlasbig.com.tr/istanbulun-mahalleleri"
    
    try:
        # Send request to the website
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the table with neighborhood data
        # Looking for table with mahalle, ilçe, nüfus, yüzölçümü columns
        table = soup.find('table')
        
        if not table:
            print("Table not found on the page")
            return []
        
        neighborhoods = []
        
        # Find all rows in the table
        rows = table.find_all('tr')
        
        for row in rows[1:]:  # Skip header row
            cells = row.find_all('td')
            if len(cells) >= 2:
                mahalle = cells[0].get_text(strip=True)
                ilce = cells[1].get_text(strip=True)
                
                # Skip if empty or contains header-like text
                if mahalle and ilce and mahalle != "Mahalle" and ilce != "İlçe":
                    neighborhoods.append({
                        "mahalle": mahalle,
                        "ilce": ilce
                    })
        
        return neighborhoods
        
    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
        return []
    except Exception as e:
        print(f"Error parsing the webpage: {e}")
        return []

def save_to_json(data, filename="mahalleler.json"):
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Data saved to {filename}")
        print(f"Total neighborhoods: {len(data)}")
    except Exception as e:
        print(f"Error saving to JSON: {e}")

def main():
    print("Scraping Istanbul neighborhoods...")
    neighborhoods = scrape_istanbul_neighborhoods()
    
    if neighborhoods:
        save_to_json(neighborhoods)
        
        # Show some statistics
        districts = set(item['ilce'] for item in neighborhoods)
        print(f"Total districts: {len(districts)}")
        print(f"Total neighborhoods: {len(neighborhoods)}")
        
        # Show first few entries as sample
        print("\nSample entries:")
        for i, item in enumerate(neighborhoods[:5]):
            print(f"{i+1}. {item['mahalle']} - {item['ilce']}")
            
    else:
        print("No data found")

if __name__ == "__main__":
    main() 