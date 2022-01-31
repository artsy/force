/**
 * @generated SignedSource<<bb165c5a71209c2fc9b3a1f659b83400>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowInfo_show$data = {
  readonly name: string | null;
  readonly about: string | null;
  readonly pressRelease: string | null;
  readonly hasLocation: boolean | null;
  readonly partner: {
    readonly __typename: "Partner";
    readonly type: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ShowPartnerEntityHeader_partner">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ShowInfoLocation_show" | "ShowHours_show">;
  readonly " $fragmentType": "ShowInfo_show";
};
export type ShowInfo_show$key = {
  readonly " $data"?: ShowInfo_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowInfo_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInfo_show",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowInfoLocation_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowHours_show"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "about",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "pressRelease",
      "storageKey": "pressRelease(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasLocation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ShowPartnerEntityHeader_partner"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            }
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "84b0d3a43686b45691ad2cbb75214684";

export default node;
