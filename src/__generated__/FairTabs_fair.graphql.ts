/**
 * @generated SignedSource<<562e8c62930d40aff12850759d51ea25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairTabs_fair$data = {
  readonly counts: {
    readonly artworks: any | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly " $fragmentType": "FairTabs_fair";
};
export type FairTabs_fair$key = {
  readonly " $data"?: FairTabs_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairTabs_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairTabs_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "fc32b98387d06c1e2a37716c9dd4090d";

export default node;
