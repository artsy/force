/**
 * @generated SignedSource<<a8582b728088582494027e69af130056>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistList_partner$data = {
  readonly allArtistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly counts: {
        readonly artworks: any | null | undefined;
      } | null | undefined;
      readonly node: {
        readonly counts: {
          readonly artworks: any | null | undefined;
        } | null | undefined;
        readonly href: string | null | undefined;
        readonly internalID: string;
        readonly name: string | null | undefined;
        readonly slug: string;
      } | null | undefined;
      readonly representedBy: boolean | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly displayFullPartnerPage: boolean | null | undefined;
  readonly distinguishRepresentedArtists: boolean | null | undefined;
  readonly href: string | null | undefined;
  readonly " $fragmentType": "PartnerArtistList_partner";
};
export type PartnerArtistList_partner$key = {
  readonly " $data"?: PartnerArtistList_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistList_partner">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "artworks",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtistList_partner",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "distinguishRepresentedArtists",
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "hasNotRepresentedArtistWithPublishedArtworks",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "allArtistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistPartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "representedBy",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerArtistCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ArtistCounts",
                  "kind": "LinkedField",
                  "name": "counts",
                  "plural": false,
                  "selections": (v1/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();

(node as any).hash = "17f3d89531eb7b895e9e03ae857c68cc";

export default node;
