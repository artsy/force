import {
  type CommandBarActions,
  filterCommands,
  getCommands,
} from "Components/CommandBar/getCommands"

const actions: CommandBarActions = {
  navigate: jest.fn(),
  followCurrentArtist: jest.fn(),
  saveCurrentArtwork: jest.fn(),
  copyCurrentLink: jest.fn(),
}

describe("getCommands", () => {
  it("includes public destinations but hides auth-gated ones when logged out", () => {
    const commands = getCommands({
      isLoggedIn: false,
      pathname: "/",
      query: "",
      actions,
    })

    const ids = commands.map(command => {
      return command.id
    })

    expect(ids).toContain("go-to-search")
    expect(ids).toContain("go-to-artists")
    expect(ids).not.toContain("go-to-saves")
    expect(ids).not.toContain("go-to-settings")
    expect(ids).not.toContain("go-to-my-collection")
  })

  it("includes auth-gated destinations when logged in", () => {
    const commands = getCommands({
      isLoggedIn: true,
      pathname: "/",
      query: "",
      actions,
    })

    const ids = commands.map(command => {
      return command.id
    })

    expect(ids).toContain("go-to-saves")
    expect(ids).toContain("go-to-settings")
    expect(ids).toContain("go-to-my-collection")
  })

  it("adds artist-specific contextual actions on an artist route", () => {
    const commands = getCommands({
      isLoggedIn: true,
      pathname: "/artist/andy-warhol",
      query: "",
      actions,
    })

    const ids = commands.map(command => {
      return command.id
    })

    expect(ids).toContain("follow-current-artist")
    expect(ids).toContain("create-alert-current-artist")
    expect(ids).not.toContain("save-current-artwork")
  })

  it("adds the save action on an artwork route", () => {
    const commands = getCommands({
      isLoggedIn: true,
      pathname: "/artwork/some-artwork",
      query: "",
      actions,
    })

    const ids = commands.map(command => {
      return command.id
    })

    expect(ids).toContain("save-current-artwork")
    expect(ids).not.toContain("follow-current-artist")
  })

  it("always offers the copy-link action", () => {
    const commands = getCommands({
      isLoggedIn: false,
      pathname: "/anything",
      query: "",
      actions,
    })

    const ids = commands.map(command => {
      return command.id
    })

    expect(ids).toContain("copy-current-link")
  })

  it("adds a search command that redirects to the search page", () => {
    const commands = getCommands({
      isLoggedIn: false,
      pathname: "/",
      query: "picasso",
      actions,
    })

    const searchCommand = commands.find(command => {
      return command.id === "search-for-query"
    })

    expect(searchCommand).toBeDefined()

    searchCommand?.run()

    expect(actions.navigate).toHaveBeenCalledWith("/search?term=picasso")
  })

  it("does not add a search command when the query is empty", () => {
    const commands = getCommands({
      isLoggedIn: false,
      pathname: "/",
      query: "   ",
      actions,
    })

    const ids = commands.map(command => {
      return command.id
    })

    expect(ids).not.toContain("search-for-query")
  })
})

describe("filterCommands", () => {
  const commands = getCommands({
    isLoggedIn: true,
    pathname: "/",
    query: "",
    actions,
  })

  it("returns all commands for an empty query", () => {
    expect(filterCommands(commands, "")).toHaveLength(commands.length)
  })

  it("matches on label case-insensitively", () => {
    const results = filterCommands(commands, "SETT")

    const ids = results.map(command => {
      return command.id
    })

    expect(ids).toContain("go-to-settings")
    expect(ids).not.toContain("go-to-artists")
  })

  it("matches on keywords", () => {
    const results = filterCommands(commands, "favorites")

    const ids = results.map(command => {
      return command.id
    })

    expect(ids).toContain("go-to-saves")
  })

  it("requires every whitespace-separated term to match", () => {
    const results = filterCommands(commands, "search alerts")

    const ids = results.map(command => {
      return command.id
    })

    expect(ids).toContain("go-to-alerts")
    expect(ids).not.toContain("go-to-search")
  })
})
