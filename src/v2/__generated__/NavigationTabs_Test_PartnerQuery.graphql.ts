/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_Test_PartnerQueryVariables = {};
export type NavigationTabs_Test_PartnerQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_partner">;
    } | null;
};
export type NavigationTabs_Test_PartnerQueryRawResponse = {
    readonly partner: ({
        readonly slug: string;
        readonly displayArtistsSection: boolean | null;
        readonly displayWorksSection: boolean | null;
        readonly filteredWorks: ({
            readonly counts: ({
                readonly total: number | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly locations: ({
            readonly totalCount: number | null;
        }) | null;
        readonly articles: ({
            readonly totalCount: number | null;
        }) | null;
        readonly representedArtists: ({
            readonly totalCount: number | null;
        }) | null;
        readonly notRepresentedArtists: ({
            readonly totalCount: number | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type NavigationTabs_Test_PartnerQuery = {
    readonly response: NavigationTabs_Test_PartnerQueryResponse;
    readonly variables: NavigationTabs_Test_PartnerQueryVariables;
    readonly rawResponse: NavigationTabs_Test_PartnerQueryRawResponse;
};



/*
query NavigationTabs_Test_PartnerQuery {
  partner(id: "white-cube") {
    ...NavigationTabs_partner
    id
  }
}

fragment NavigationTabs_partner on Partner {
  slug
  displayArtistsSection
  displayWorksSection
  filteredWorks: filterArtworksConnection(first: 0) {
    counts {
      total
    }
    id
  }
  locations: locationsConnection(first: 20) {
    totalCount
  }
  articles: articlesConnection {
    totalCount
  }
  representedArtists: artistsConnection(representedBy: true, displayOnPartnerProfile: true) {
    totalCount
  }
  notRepresentedArtists: artistsConnection(representedBy: false, hasPublishedArtworks: true, displayOnPartnerProfile: true) {
    totalCount
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v3 = {
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavigationTabs_Test_PartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NavigationTabs_partner"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationTabs_Test_PartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
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
              },
              (v1/*: any*/)
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
            "selections": (v2/*: any*/),
            "storageKey": "locationsConnection(first:20)"
          },
          {
            "alias": "articles",
            "args": null,
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": "representedArtists",
            "args": [
              (v3/*: any*/),
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
            "selections": (v2/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,representedBy:true)"
          },
          {
            "alias": "notRepresentedArtists",
            "args": [
              (v3/*: any*/),
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
            "selections": (v2/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:true,representedBy:false)"
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "NavigationTabs_Test_PartnerQuery",
    "operationKind": "query",
    "text": "query NavigationTabs_Test_PartnerQuery {\n  partner(id: \"white-cube\") {\n    ...NavigationTabs_partner\n    id\n  }\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n  displayArtistsSection\n  displayWorksSection\n  filteredWorks: filterArtworksConnection(first: 0) {\n    counts {\n      total\n    }\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n  }\n  articles: articlesConnection {\n    totalCount\n  }\n  representedArtists: artistsConnection(representedBy: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  notRepresentedArtists: artistsConnection(representedBy: false, hasPublishedArtworks: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c84bdc912b3f9fed0de3f5762759a1ed';
export default node;
