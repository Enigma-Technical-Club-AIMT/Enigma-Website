import { NextResponse } from 'next/server'

// In a real production app, this would fetch from LeetCode / Codeforces APIs
// Example LeetCode public API: https://alfa-leetcode-api.onrender.com/username
export async function GET() {
  // Mock data representing club members' competitive programming stats
  const mockLeaderboard = [
    {
      id: 1,
      name: "Alex Johnson",
      username: "alexj_codes",
      platform: "LeetCode",
      problemsSolved: 450,
      globalRank: 42000,
      badge: "Knight",
      streak: 15,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      id: 2,
      name: "Priya Sharma",
      username: "priya_dev",
      platform: "Codeforces",
      problemsSolved: 620,
      globalRank: 18500,
      badge: "Expert",
      streak: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      id: 3,
      name: "Marcus Chen",
      username: "marcus_c",
      platform: "LeetCode",
      problemsSolved: 310,
      globalRank: 89000,
      badge: "Guardian",
      streak: 42,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    {
      id: 4,
      name: "Sarah Williams",
      username: "sarahw_cp",
      platform: "LeetCode",
      problemsSolved: 275,
      globalRank: 105000,
      badge: "None",
      streak: 7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: 5,
      name: "David Kim",
      username: "dkim_algo",
      platform: "Codeforces",
      problemsSolved: 580,
      globalRank: 22000,
      badge: "Specialist",
      streak: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    }
  ]

  // Sort by problems solved descending
  const sortedLeaderboard = mockLeaderboard.sort((a, b) => b.problemsSolved - a.problemsSolved)

  return NextResponse.json({
    success: true,
    lastUpdated: new Date().toISOString(),
    data: sortedLeaderboard
  })
}
