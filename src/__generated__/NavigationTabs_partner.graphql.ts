/**
 * @generated SignedSource<<1a1aa18d06babca86cd4b6bc4d0cf2c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_partner$data = {
  readonly articles: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly counts: {
    readonly displayableShows: any | null | undefined;
    readonly eligibleArtworks: any | null | undefined;
  } | null | undefined;
  readonly displayArtistsSection: boolean | null | undefined;
  readonly displayWorksSection: boolean | null | undefined;
  readonly locations: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly notRepresentedArtists: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly partnerType: string | null | undefined;
  readonly representedArtists: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly viewingRooms: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "NavigationTabs_partner";
};
export type NavigationTabs_partner$key = {
  readonly " $data"?: NavigationTabs_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavigationTabs_partner">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v1 = {
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavigationTabs_partner",
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
      "name": "partnerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayArtistsSection",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayWorksSection",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eligibleArtworks",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayableShows",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "locations",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "LocationConnection",
      "kind": "LinkedField",
      "name": "locationsConnection",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "locationsConnection(first:20)"
    },
    {
      "alias": "articles",
      "args": null,
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": "representedArtists",
      "args": [
        (v1/*: any*/),
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
      "selections": (v0/*: any*/),
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,representedBy:true)"
    },
    {
      "alias": "notRepresentedArtists",
      "args": [
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "hasPublishedArtworks",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "representedBy",
          "value": false
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:true,representedBy:false)"
    },
    {
      "alias": "viewingRooms",
      "args": [
        {
          "kind": "Literal",
          "name": "statuses",
          "value": [
            "live",
            "closed",
            "scheduled"
          ]
        }
      ],
      "concreteType": "ViewingRoomsConnection",
      "kind": "LinkedField",
      "name": "viewingRoomsConnection",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "viewingRoomsConnection(statuses:[\"live\",\"closed\",\"scheduled\"])"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();

(node as any).hash = "e037daa355e3338cdce93f1238b3c646";

export default node;
