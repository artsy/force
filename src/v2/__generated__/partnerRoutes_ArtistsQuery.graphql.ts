/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_ArtistsQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_ArtistsQueryResponse = {
    readonly partner: {
        readonly displayArtistsSection: boolean | null;
        readonly artists: {
            readonly totalCount: number | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Artists_partner">;
    } | null;
};
export type partnerRoutes_ArtistsQuery = {
    readonly response: partnerRoutes_ArtistsQueryResponse;
    readonly variables: partnerRoutes_ArtistsQueryVariables;
};



/*
query partnerRoutes_ArtistsQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    ...Artists_partner
    displayArtistsSection
    artists: artistsConnection(first: 20) {
      totalCount
    }
    id
  }
}

fragment Artists_partner on Partner {
  ...PartnerArtists_partner
}

fragment PartnerArtistItem_artist on Artist {
  name
  slug
}

fragment PartnerArtistList_artists on ArtistPartnerEdge {
  representedBy
  isDisplayOnPartnerProfile
  counts {
    artworks
  }
  node {
    internalID
    ...PartnerArtistItem_artist
    id
  }
}

fragment PartnerArtists_partner on Partner {
  slug
  distinguishRepresentedArtists
  artistsConnection(first: 20) {
    edges {
      ...PartnerArtistList_artists
      cursor
      node {
        __typename
        id
      }
      id
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayArtistsSection",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v4 = {
  "alias": "artists",
  "args": (v3/*: any*/),
  "concreteType": "ArtistPartnerConnection",
  "kind": "LinkedField",
  "name": "artistsConnection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "storageKey": "artistsConnection(first:20)"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_ArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Artists_partner"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "partnerRoutes_ArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "distinguishRepresentedArtists",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
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
                    "kind": "ScalarField",
                    "name": "isDisplayOnPartnerProfile",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistCounts",
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
                        "name": "name",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistsConnection(first:20)"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "PartnerArtistsQuery_artistsConnection",
            "kind": "LinkedHandle",
            "name": "artistsConnection"
          },
          (v2/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_ArtistsQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_ArtistsQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...Artists_partner\n    displayArtistsSection\n    artists: artistsConnection(first: 20) {\n      totalCount\n    }\n    id\n  }\n}\n\nfragment Artists_partner on Partner {\n  ...PartnerArtists_partner\n}\n\nfragment PartnerArtistItem_artist on Artist {\n  name\n  slug\n}\n\nfragment PartnerArtistList_artists on ArtistPartnerEdge {\n  representedBy\n  isDisplayOnPartnerProfile\n  counts {\n    artworks\n  }\n  node {\n    internalID\n    ...PartnerArtistItem_artist\n    id\n  }\n}\n\nfragment PartnerArtists_partner on Partner {\n  slug\n  distinguishRepresentedArtists\n  artistsConnection(first: 20) {\n    edges {\n      ...PartnerArtistList_artists\n      cursor\n      node {\n        __typename\n        id\n      }\n      id\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '11fc4d6bf4baf9149e8afbe3c1bad460';
export default node;
