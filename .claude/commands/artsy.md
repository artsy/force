Display the following guidance about working with Claude on Artsy projects to the user:

IMPORTANT: Display it verbatim, i.e. the entire text between the backticks, and nothing else.

```
# Agent guidelines for Artsy developers

> A summary of our approach to agent-assisted coding in this repo.

## Project memory

- We prefer AGENTS.md over CLAUDE.md
  - The latter simply points to the former
- AGENTS.md should contain general advice that is likely to be applicable to MOST sessions, such as…
  - general information about the repo and its stack
  - how to lint, test, compile, etc
  - code style guidelines
  - pointers to further documentation

## Agent skills

- If a sizeable chore is done repeatedly but infrequently, we consider extracting it to an agent skill, such as…
  - `adding-a-new-app-route`
  - `writing-new-tests`
- Consider this especially for multi-step workflows that make use of boilerplate code.
- Be sure to follow best practice advice
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
  - https://agentskills.io/

## Other tricks

- **Slash commands** such as this `/artsy` command (`force/.claude/commands/artsy.md`) create simple repeatable prompts
- More to come (when to use slash commands vs. subagents vs. skills, oh my…)
```
