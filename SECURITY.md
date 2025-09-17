# Security Documentation

## Package Resolutions for Security Vulnerabilities

Run `yarn npm audit --severity critical --recursive` to audit, adjusting the `severity` as needed. The `--recursive` will also check transitive deps, which is increasingly becoming necessary due to supply chain attacks.

The following resolutions in `package.json` are specifically added to address critical security vulnerabilities:

### Added on 2025-09-17

```json
"cipher-base": "^1.0.5"
```

- **Issue**: Missing type checks leading to hash rewind vulnerability
- **CVE**: GHSA-cpq7-6gpm-g9rc
- **Fixed version**: 1.0.5+ (was vulnerable ≤1.0.4)

```json
"form-data": "^4.0.4"
```

- **Issue**: Unsafe random function for choosing boundary
- **CVE**: GHSA-fjxv-7rqg-78g4
- **Fixed version**: 4.0.4+ (was vulnerable 4.0.0-4.0.3 and <2.5.4)

```json
"lodash": "^4.17.21"
```

- **Issue**: Prototype pollution vulnerability
- **CVE**: GHSA-jf85-cpcp-j695
- **Fixed version**: 4.17.12+ (was vulnerable <4.17.12)

```json
"sha.js": "^2.4.12"
```

- **Issue**: Missing type checks leading to hash rewind vulnerability
- **CVE**: GHSA-95m3-7q98-8xr5
- **Fixed version**: 2.4.12+ (was vulnerable ≤2.4.11)

## Verification

Run `yarn npm audit --severity critical --recursive` to verify no critical vulnerabilities remain.

## Notes

- These resolutions force transitive dependencies to use secure versions
- Package versions chosen are minimal security fixes to avoid breaking changes
- Direct dependency updates were also made where possible (express-ipfilter, superagent, jsdom)
