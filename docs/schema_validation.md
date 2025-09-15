# Force-Metaphysics Schema Validation

This document explains how Force validates GraphQL schema compatibility with Metaphysics during production deployments.

## Overview

Force includes a schema validation mechanism that prevents deployments when there are breaking changes between Force's local GraphQL schema and Metaphysics' production schema. This ensures API compatibility and prevents runtime errors.

## How It Works

### 1. Schema Validation Job

During production deployments (on the `release` branch), CircleCI runs a `validate_production_schema` job that:

- Downloads the current production Metaphysics schema from GitHub
- Compares it with Force's local schema using GraphQL Inspector
- Identifies breaking changes between the schemas
- Fails the deployment if breaking changes are detected

### 2. Schema Comparison

The validation script (`scripts/validateSchemas.js`) compares:

- **Local schema**: `/data/schema.graphql` (Force's local GraphQL schema)
- **Production schema**: Downloaded from `https://raw.githubusercontent.com/artsy/metaphysics/release/_schemaV2.graphql`

### 3. Breaking Change Detection

Using `@graphql-inspector/core`, the script identifies changes with `BREAKING` criticality level, such as:

- Removed fields or types
- Changed field types
- Removed enum values
- Modified argument requirements

## When Validation Fails

### Slack Notification

If schema validation fails, a Slack notification is sent to the engineering team with:

- **Message**: Explains the schema incompatibility issue
- **Instructions**: Provides steps to resolve the problem
- **Links**: Direct links to CircleCI build and Metaphysics deploy process

### Resolution Steps

1. **Deploy Metaphysics First**: Create a Deploy PR for Metaphysics to update production

   - GitHub link: https://github.com/artsy/metaphysics/compare/release...staging?expand=1

2. **Wait for Metaphysics Deployment**: Allow Metaphysics production to update with the new schema

3. **Retry Force Deployment**: Use "Rerun workflow from failed" on the CircleCI build page

## Files Involved

### Configuration

- `.circleci/config.yml` - CircleCI job definition and Slack notification setup

### Scripts

- `scripts/validateSchemas.js` - Schema comparison logic
- `/data/schema.graphql` - Force's local GraphQL schema

### Dependencies

- `@graphql-inspector/core` - Breaking change detection
- `graphql` - Schema parsing and building
- `isomorphic-fetch` - Remote schema downloading

## Development Usage

You can run schema validation locally:

```bash
# Check against production Metaphysics
node scripts/validateSchemas.js production

# Check against staging Metaphysics
node scripts/validateSchemas.js staging
```

## CircleCI Integration

The schema validation is integrated into the production deployment workflow:

```yaml
validate_production_schema:
  executor: node-executor
  steps:
    - checkout
    - node/install-packages:
        pkg-manager: yarn
    - run:
        name: Validate Production Schema
        command: node scripts/validateSchemas.js production
    - slack/notify:
        event: fail
        # Slack notification configuration...
```

This ensures that schema compatibility is verified before any production deployment proceeds.
