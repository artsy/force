/**
 * @generated SignedSource<<9a2bff8750bfb156fe219bae4d851514>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_fair$data = {
  readonly exhibitorsGroupedByName: ReadonlyArray<{
    readonly exhibitors: ReadonlyArray<{
      readonly partnerID: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly letter: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_exhibitorsGroup">;
  } | null | undefined> | null | undefined;
  readonly href: string | null | undefined;
  readonly metaDescription: string | null | undefined;
  readonly metaDescriptionFallback: string | null | undefined;
  readonly metaImage: {
    readonly src: string | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_fair">;
  readonly " $fragmentType": "FairExhibitors_fair";
};
export type FairExhibitors_fair$key = {
  readonly " $data"?: FairExhibitors_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitors_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitors_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairExhibitorsGroup_fair"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "metaDescription",
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": "metaDescriptionFallback",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"PLAIN\")"
    },
    {
      "alias": "metaImage",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large_rectangle"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large_rectangle\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairExhibitorsGroup",
      "kind": "LinkedField",
      "name": "exhibitorsGroupedByName",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairExhibitorsGroup_exhibitorsGroup"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "letter",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "FairExhibitor",
          "kind": "LinkedField",
          "name": "exhibitors",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "partnerID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "e4e41ac00064ec650ce4cfa58f59d7b3";

export default node;
