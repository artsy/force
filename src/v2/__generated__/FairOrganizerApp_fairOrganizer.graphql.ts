/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_fairOrganizer = {
    readonly name: string | null;
    readonly slug: string;
    readonly about: string | null;
    readonly profile: {
        readonly image: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventsRail_fairOrganizer" | "FairOrganizerHeaderImage_fairOrganizer" | "FairOrganizerHeader_fairOrganizer" | "FairOrganizerLatestArticles_fairOrganizer">;
    readonly " $refType": "FairOrganizerApp_fairOrganizer";
};
export type FairOrganizerApp_fairOrganizer$data = FairOrganizerApp_fairOrganizer;
export type FairOrganizerApp_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerApp_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
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
  "type": "FairOrganizer"
};
(node as any).hash = '72c9c6980aa419127501dd39b6d34f3e';
export default node;
