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
  pr_numbers = commit_shas.map do |sha|
    `git log --merges --ancestry-path --oneline "#{sha}"..master | grep 'pull request' | tail -n1 | awk '{print $5}' | cut -c2-`.strip
  end.uniq

  prs = pr_numbers.compact.reject(&:empty?).map{|n| github.api.pull_request('artsy/force', n) }

  if prs.any?
    message = "### This deploy contains the following PRs:\n\n"
    prs.each do |pr|
      message << "- #{pr.title} ([##{pr.number}](#{pr.html_url}) by @#{pr.user.login})\n"
    end
    markdown message
  end
end
