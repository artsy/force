/**
 * @generated SignedSource<<c880a90e4f13aff888cc81319b4bbe1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_fairOrganizer$data = {
  readonly description: string | null | undefined;
  readonly name: string | null | undefined;
  readonly profile: {
    readonly image: {
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly isPublished: boolean | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerHeaderImage_fairOrganizer" | "FairOrganizerHeader_fairOrganizer" | "FairOrganizerLatestArticles_fairOrganizer" | "FairOrganizerPastEventsRail_fairOrganizer">;
  readonly " $fragmentType": "FairOrganizerApp_fairOrganizer";
};
export type FairOrganizerApp_fairOrganizer$key = {
  readonly " $data"?: FairOrganizerApp_fairOrganizer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerApp_fairOrganizer",
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
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "description",
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
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "wide"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"wide\")"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPublished",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerPastEventsRail_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerHeaderImage_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerHeader_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerLatestArticles_fairOrganizer"
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};

(node as any).hash = "431a373867e0c3009778ef3955bee7b0";

export default node;
