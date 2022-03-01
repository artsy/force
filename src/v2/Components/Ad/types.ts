export const AD_UNITS = [
  "Desktop_InContentLB2",
  "Desktop_InContentLB2",
  "Desktop_Leaderboard1",
  "Desktop_Leaderboard2",
  "Desktop_LeaderboardRepeat",
  "Desktop_RightRail1",
  "Desktop_TopLeaderboard",
  "Mobile_InContentLB1",
  "Mobile_InContentLB2",
  "Mobile_InContentLBRepeat",
  "Mobile_InContentMR1",
  "Mobile_InContentMR2",
  "Mobile_InContentMRRepeat",
  "Mobile_TopLeaderboard",
] as const

export type AdUnit = typeof AD_UNITS[number]

export const AD_SIZES = ["300x50", "300x250", "970x250"] as const

export type AdSize = typeof AD_SIZES[number]
