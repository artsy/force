/**
 * @generated SignedSource<<691869d16998a2b6084b9f6ca1ab42da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerHeader_fairOrganizer$data = {
  readonly fairsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly exhibitionPeriod: string | null | undefined;
        readonly href: string | null | undefined;
        readonly startAt: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly profile: {
    readonly icon: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerFollowButton_fairOrganizer" | "FairOrganizerInfo_fairOrganizer">;
  readonly " $fragmentType": "FairOrganizerHeader_fairOrganizer";
};
export type FairOrganizerHeader_fairOrganizer$key = {
  readonly " $data"?: FairOrganizerHeader_fairOrganizer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerHeader_fairOrganizer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerHeader_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_DESC"
        }
      ],
      "concreteType": "FairConnection",
      "kind": "LinkedField",
      "name": "fairsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FairEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Fair",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                  "kind": "ScalarField",
                  "name": "startAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "exhibitionPeriod",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "fairsConnection(first:1,sort:\"START_AT_DESC\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "large",
                    "square",
                    "square140"
                  ]
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:[\"large\",\"square\",\"square140\"])"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerFollowButton_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerInfo_fairOrganizer"
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};

(node as any).hash = "b4e2b73a4213d8ea4b87718e8cbba060";

export default node;
