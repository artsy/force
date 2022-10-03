/**
 * @generated SignedSource<<1d3d0e4053127797ee59ad294412ba93>>
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
        readonly exhibitionPeriod: string | null;
        readonly href: string | null;
        readonly startAt: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly name: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerFollowButton_fairOrganizer" | "FairOrganizerHeaderIcon_fairOrganizer" | "FairOrganizerInfo_fairOrganizer">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerHeaderIcon_fairOrganizer"
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

(node as any).hash = "75d33688c6accfce21edc2a10fc1f6ec";

export default node;
