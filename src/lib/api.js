import { promises as fs } from "fs";
import path from "path";

// Helper to read JSON files from the 'public/data' folder
// This mimics a database query running on the server
async function fetchJson(fileName) {
  const filePath = path.join(process.cwd(), "public/data", fileName);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

// 1. Get All Locations (for listing them)
export async function getLocations() {
  return await fetchJson("locations.json");
}

// 2. Get Single Location by Slug (for the dynamic page)
export async function getLocationBySlug(slug) {
  const locations = await getLocations();
  return locations.find((loc) => loc.slug === slug) || null;
}

// 3. Get Full Schedule for a specific Location
export async function getScheduleByLocation(locationId) {
  const allEvents = await fetchJson("schedule.json");
  // Filter events for just this city
  return allEvents.filter((event) => event.locationId === locationId);
}

// 4. Get Truck Details (to show in the Modal later)
export async function getTruckById(truckId) {
  const trucks = await fetchJson("trucks.json");
  return trucks.find((t) => t.id === truckId);
}

// 5. Get All Trucks (to map IDs to Names in the calendar)
export async function getAllTrucks() {
  return await fetchJson("trucks.json");
}

// 6. Get Holidays (for the calendar icons)
export async function getHolidays() {
  return await fetchJson("holidays.json");
}

// 7. Get All Menus (to pass to the calendar/modals)
export async function getAllMenus() {
  return await fetchJson("menus.json");
}
