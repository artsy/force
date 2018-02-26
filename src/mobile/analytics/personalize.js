// ONBOARDING_TEST remove after test closes
if (location.pathname.match('/personalize')) {
  analytics.track('Experiment Viewed', {
    experiment_id: 'onboarding_test',
    experiment_name: 'onboarding_test',
    variation_id: 'control',
    variation_name: 'control',
    nonInteraction: 1
  })
}
