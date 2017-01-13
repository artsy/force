# Ensure that people always include a PR summary
warn("Please include a PR summary", sticky: false) if github.pr_body.length < 5

# Ensure that we assign PRs to someone
has_assignee = github.pr_title.include?("@") || github.pr_json["assignee"]
warn("Please assign someone to your PR", sticky: false) unless has_assignee
