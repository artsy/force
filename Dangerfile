# Ensure that people always include a PR summary for non-deploys
unless github.branch_for_base == 'release'
  warn("Please include a PR summary", sticky: false) if github.pr_body.length < 5
end

# Ensure that we assign non-deploy PRs to someone
unless github.branch_for_base == 'release'
  has_assignee = github.pr_title.include?("@") || github.pr_json["assignee"]
  warn("Please assign someone to your PR", sticky: false) unless has_assignee
end

# If this is a PR to 'release', post a comment with all PRs
if github.branch_for_base == 'release'
  # Get all commit sha's in this deploy
  commit_shas = git.commits.map(&:sha)

  # Get all PR's in this deploy (from commits)
  prs = []
  commit_shas.each do |sha|
    pr_command = `git log --merges --ancestry-path --oneline "#{sha}"..master | grep 'pull request' | tail -n1 | awk '{print $5}' | cut -c2-`
    prs << pr_command.strip
  end
  prs.uniq!

  # Get all PR info
  pr_info = {}
  prs.each do |pr|
    next if pr.length == 0
    pr_json = github.api.pull_request('artsy/force', pr)
    pr_info[pr] = {}
    pr_info[pr][:title] = pr_json.title
    pr_info[pr][:id] = pr
    pr_info[pr][:href] = "https://github.com/artsy/force/#{pr}"
  end

  # Format message
  message = "### This deploy contains the following PRs:\n\n"
  pr_info.each do |pr_id, info|
    message << "#{info[:title]} (#{info[:href]})\n"
  end
  markdown message
end
