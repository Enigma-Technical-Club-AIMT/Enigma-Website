// Call getEvents server action through the server-actions HTTP endpoint
import { execSync } from 'child_process'

// Build the request: Next.js serves server actions via POST to / with Action headers
// Simplest reliable way: use node with ts-node... instead just read events.json directly
import fs from 'fs'
const ev = JSON.parse(fs.readFileSync('data/events.json', 'utf8'))
console.log('events.json count:', ev.length)
