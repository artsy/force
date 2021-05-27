/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsRail_partner = {
    readonly slug: string;
    readonly profileArtistsLayout: string | null;
    readonly fullProfileEligible: boolean | null;
    readonly artistsWithPublishedArtworks: {
        readonly totalCount: number | null;
    } | null;
    readonly representedArtistsWithoutPublishedArtworks: {
        readonly totalCount: number | null;
    } | null;
    readonly " $refType": "ArtistsRail_partner";
};
export type ArtistsRail_partner$data = ArtistsRail_partner;
export type ArtistsRail_partner$key = {
    readonly " $data"?: ArtistsRail_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsRail_partner">;
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
      "name": "fullProfileEligible",
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
  "type": "Partner"
};
})();
(node as any).hash = '02186f4c9fdef7796ede584ff3e56ea6';
export default node;
