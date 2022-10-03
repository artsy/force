/**
 * @generated SignedSource<<166df1763347010f759284da0ebdcb13>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsRail_partner$data = {
  readonly artistsWithPublishedArtworks: {
    readonly totalCount: number | null;
  } | null;
  readonly displayFullPartnerPage: boolean | null;
  readonly profileArtistsLayout: string | null;
  readonly representedArtistsWithoutPublishedArtworks: {
    readonly totalCount: number | null;
  } | null;
  readonly slug: string;
  readonly " $fragmentType": "ArtistsRail_partner";
};
export type ArtistsRail_partner$key = {
  readonly " $data"?: ArtistsRail_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistsRail_partner">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsRail_partner",
  "selections": [
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
      "kind": "ScalarField",
      "name": "profileArtistsLayout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    },
    {
      "alias": "artistsWithPublishedArtworks",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "hasPublishedArtworks",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:true)"
    },
    {
      "alias": "representedArtistsWithoutPublishedArtworks",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "hasPublishedArtworks",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "representedBy",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:false,representedBy:true)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();

(node as any).hash = "6e3f5614154d029788ee03ec4b6937c3";

export default node;
