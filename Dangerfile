# Ensure that people always include a PR summary
warn("Please include a PR summary", sticky: false) if github.pr_body.length < 5

# Ensure that we assign PRs to someone
warn("Please assign someone to your PR", sticky: false) unless github.pr_title.include?("@")
