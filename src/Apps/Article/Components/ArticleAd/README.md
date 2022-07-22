# On-Platform Ads Placement Spec

### Standard Layout

- Above header
  - unit: `Desktop_TopLeaderboard`
  - size: `970x250`
- Right-hand column under "Related Stories"
  - unit: `Desktop_RightRail1`
  - size: `300x250`
- Deviate from existing spec ("After the 2nd image + text section");
  simplifies to after the 7th section. Also deviates from the size
  (previously `300x250`) to `970x250`
  - unit: `Desktop_LeaderboardRepeat`
  - size: `970x250`

### Feature Layout

- Interspersed throughout sections; 2 total
  - After the 2nd section
    - unit: `Desktop_Leaderboard1`
    - size: `970x250`
  - After the 7th section
    - unit: `Desktop_Leaderboard2`
    - size: `970x250`

### Video Layout

- Below content
  - unit: `Desktop_InContentLB2`
  - size: `970x250`

### Series Layout

- Below content
  - unit: `Desktop_InContentLB2`
  - size: `970x250`

### Classic Layout

- No ads

### News Layout

- No ads

### News Index

- Interspersed between articles:
  - After 3rd article
    - unit: `Desktop_Leaderboard1`
    - size: `970x250`
  - After 9th article
    - unit: `Desktop_Leaderboard2`
    - size: `970x250`
  - Every 6th article after that
    - unit: `Desktop_LeaderboardRepeat`
    - size: `970x250`
