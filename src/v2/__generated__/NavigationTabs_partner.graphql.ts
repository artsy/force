/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_partner = {
    readonly slug: string;
    readonly displayArtistsSection: boolean | null;
    readonly locations: {
        readonly totalCount: number | null;
    } | null;
    readonly articles: {
        readonly totalCount: number | null;
    } | null;
    readonly artists: {
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
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
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
      "alias": "locations",
      "args": (v0/*: any*/),
      "concreteType": "LocationConnection",
      "kind": "LinkedField",
      "name": "locationsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "locationsConnection(first:20)"
    },
    {
      "alias": "articles",
      "args": (v0/*: any*/),
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "articlesConnection(first:20)"
    },
    {
      "alias": "artists",
      "args": (v0/*: any*/),
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "artistsConnection(first:20)"
    }
  ],
  "type": "Partner"
};
})();
(node as any).hash = '07da3865f2f665ac7cdcf2d11fbf925a';
export default node;
