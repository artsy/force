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
        readonly partnerType: string | null;
        readonly displayArtistsSection: boolean | null;
        readonly displayWorksSection: boolean | null;
        readonly counts: ({
            readonly eligibleArtworks: number | null;
            readonly displayableShows: number | null;
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
        readonly viewingRooms: ({
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
  partnerType
  displayArtistsSection
  displayWorksSection
  counts {
    eligibleArtworks
    displayableShows
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
  viewingRooms: viewingRoomsConnection(statuses: [live, closed, scheduled]) {
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
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v2 = {
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
},
v3 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "ArtistPartnerConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "FormattedNumber",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
            "selections": (v1/*: any*/),
            "storageKey": "locationsConnection(first:20)"
          },
          {
            "alias": "articles",
            "args": null,
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": "representedArtists",
            "args": [
              (v2/*: any*/),
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
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,representedBy:true)"
          },
          {
            "alias": "notRepresentedArtists",
            "args": [
              (v2/*: any*/),
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
            "selections": (v1/*: any*/),
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
            "selections": (v1/*: any*/),
            "storageKey": "viewingRoomsConnection(statuses:[\"live\",\"closed\",\"scheduled\"])"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "partner.partnerType": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.displayArtistsSection": (v3/*: any*/),
        "partner.displayWorksSection": (v3/*: any*/),
        "partner.counts": {
          "type": "PartnerCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.locations": {
          "type": "LocationConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.articles": {
          "type": "ArticleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.representedArtists": (v4/*: any*/),
        "partner.notRepresentedArtists": (v4/*: any*/),
        "partner.viewingRooms": {
          "type": "ViewingRoomsConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.counts.eligibleArtworks": (v5/*: any*/),
        "partner.counts.displayableShows": (v5/*: any*/),
        "partner.locations.totalCount": (v6/*: any*/),
        "partner.articles.totalCount": (v6/*: any*/),
        "partner.representedArtists.totalCount": (v6/*: any*/),
        "partner.notRepresentedArtists.totalCount": (v6/*: any*/),
        "partner.viewingRooms.totalCount": (v6/*: any*/)
      }
    },
    "name": "NavigationTabs_Test_PartnerQuery",
    "operationKind": "query",
    "text": "query NavigationTabs_Test_PartnerQuery {\n  partner(id: \"white-cube\") {\n    ...NavigationTabs_partner\n    id\n  }\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n  partnerType\n  displayArtistsSection\n  displayWorksSection\n  counts {\n    eligibleArtworks\n    displayableShows\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n  }\n  articles: articlesConnection {\n    totalCount\n  }\n  representedArtists: artistsConnection(representedBy: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  notRepresentedArtists: artistsConnection(representedBy: false, hasPublishedArtworks: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  viewingRooms: viewingRoomsConnection(statuses: [live, closed, scheduled]) {\n    totalCount\n  }\n}\n"
  }
};
})();
(node as any).hash = '85ae05fcd987cc2b4213941dc3a37bb9';
export default node;
