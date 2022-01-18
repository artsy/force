/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_fair = {
    readonly internalID: string;
    readonly href: string | null;
    readonly slug: string;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly profile: {
        readonly id: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairMeta_fair" | "FairHeader_fair" | "FairHeaderImage_fair" | "ExhibitorsLetterNav_fair">;
    readonly " $refType": "FairApp_fair";
};
export type FairApp_fair$data = FairApp_fair;
export type FairApp_fair$key = {
    readonly " $data"?: FairApp_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairApp_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairMeta_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeader_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeaderImage_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExhibitorsLetterNav_fair"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
(node as any).hash = '2228432f7f50a07519a6d0bd2144be63';
export default node;
