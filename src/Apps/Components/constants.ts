export const Z = {
  footer: 1,
  popover: 75,
  appDownloadFooter: 95,
  globalNav: 100,
  // Anchored to a nav bar item, so it must render above the nav itself
  onboardingPopover: 101,
  // Toasts must appear above Palette modals (z-index: 9999)
  toasts: 10001,
  dropdown: 200,
  navDropdown: 250,
  pageLoadingBar: 300,
} as const
