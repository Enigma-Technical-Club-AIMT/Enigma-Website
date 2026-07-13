'use server'

import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

const MEMBERS_FILE = path.join(process.cwd(), 'data', 'members.json')
const EVENTS_FILE = path.join(process.cwd(), 'data', 'events.json')

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get('enigma_admin_session')?.value === 'true'
}

// Authentication actions
export async function login(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD || 'admin123'

  if (username === expectedUser && password === expectedPass) {
    const cookieStore = await cookies()
    cookieStore.set('enigma_admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return { success: true }
  }
  return { success: false, error: 'Invalid username or password' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('enigma_admin_session')
  return { success: true }
}

export async function verifyAuth() {
  return await isAuthenticated()
}

// CRUD for Members
export async function getMembers() {
  try {
    const data = await fs.readFile(MEMBERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading members:', err)
    return []
  }
}

export async function saveMember(member) {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const members = await getMembers()
  if (member.id) {
    // Edit
    const index = members.findIndex((m) => m.id === member.id)
    if (index !== -1) {
      members[index] = { ...members[index], ...member }
    }
  } else {
    // Create
    const newId = members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1
    members.push({ ...member, id: newId })
  }

  await fs.writeFile(MEMBERS_FILE, JSON.stringify(members, null, 2), 'utf8')
  return { success: true }
}

export async function deleteMember(id) {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const members = await getMembers()
  const filtered = members.filter((m) => m.id !== id)
  await fs.writeFile(MEMBERS_FILE, JSON.stringify(filtered, null, 2), 'utf8')
  return { success: true }
}

// CRUD for Events
export async function getEvents() {
  try {
    const data = await fs.readFile(EVENTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading events:', err)
    return []
  }
}

export async function saveEvent(event) {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const eventsList = await getEvents()
  if (event.id) {
    // Edit
    const index = eventsList.findIndex((e) => e.id === event.id)
    if (index !== -1) {
      eventsList[index] = { ...eventsList[index], ...event }
    }
  } else {
    // Create
    const newId = eventsList.length > 0 ? Math.max(...eventsList.map((e) => e.id)) + 1 : 1
    eventsList.push({ ...event, id: newId })
  }

  await fs.writeFile(EVENTS_FILE, JSON.stringify(eventsList, null, 2), 'utf8')
  return { success: true }
}

export async function deleteEvent(id) {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const eventsList = await getEvents()
  const filtered = eventsList.filter((e) => e.id !== id)
  await fs.writeFile(EVENTS_FILE, JSON.stringify(filtered, null, 2), 'utf8')
  return { success: true }
}
