/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_partner = {
    readonly slug: string;
    readonly displayArtistsSection: boolean | null;
    readonly displayWorksSection: boolean | null;
    readonly filteredWorks: {
        readonly counts: {
            readonly total: number | null;
        } | null;
    } | null;
    readonly locations: {
        readonly totalCount: number | null;
    } | null;
    readonly articles: {
        readonly totalCount: number | null;
    } | null;
    readonly representedArtists: {
        readonly totalCount: number | null;
    } | null;
    readonly notRepresentedArtists: {
        readonly totalCount: number | null;
    } | null;
    readonly " $refType": "NavigationTabs_partner";
};
export type NavigationTabs_partner$data = NavigationTabs_partner;
export type NavigationTabs_partner$key = {
    readonly " $data"?: NavigationTabs_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_partner">;
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
      "alias": "filteredWorks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 0
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "total",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "filterArtworksConnection(first:0)"
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
    }
  ],
  "type": "Partner"
};
})();
(node as any).hash = 'e585c7be93a298912dd7a8f5f4444439';
export default node;
