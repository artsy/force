#!/bin/bash
#
# Enforces that lodash is always imported per-method rather than as a whole
# library, to avoid bundling unused code.
#
# Good:   import compact from "lodash/compact"
# Bad:    import { compact } from "lodash"
# Bad:    import _ from "lodash"

set -euo pipefail

PATTERN='from ["'"'"']lodash["'"'"']'

if grep -r --include="*.ts" --include="*.tsx" --include="*.js" "$PATTERN" src/ scripts/ 2>/dev/null; then
  echo ""
  echo "ERROR: Whole-library lodash imports detected (shown above)."
  echo "Import individual methods instead, e.g.:"
  echo "  import compact from \"lodash/compact\""
  exit 1
fi

echo "✓ No whole-library lodash imports found."
