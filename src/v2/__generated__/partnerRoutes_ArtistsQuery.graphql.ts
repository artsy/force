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
        readonly allArtistsConnection: {
            readonly totalCount: number | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtistsRoute_partner">;
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
    ...ArtistsRoute_partner
    displayArtistsSection
    allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {
      totalCount
    }
    id
  }
}

fragment ArtistsRoute_partner on Partner {
  ...PartnerArtists_partner
}

fragment PartnerArtistItem_artist on Artist {
  name
  slug
  href
}

fragment PartnerArtistList_artists on ArtistPartnerEdge {
  representedBy
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
  displayFullPartnerPage
  allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {
    edges {
      ...PartnerArtistList_artists
      id
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
    "name": "displayOnPartnerProfile",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "hasNotRepresentedArtistWithPublishedArtworks",
    "value": true
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
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
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "allArtistsConnection",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistsRoute_partner"
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
            "args": null,
            "kind": "ScalarField",
            "name": "displayFullPartnerPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
          },
          (v2/*: any*/),
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
    "text": "query partnerRoutes_ArtistsQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...ArtistsRoute_partner\n    displayArtistsSection\n    allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {\n      totalCount\n    }\n    id\n  }\n}\n\nfragment ArtistsRoute_partner on Partner {\n  ...PartnerArtists_partner\n}\n\nfragment PartnerArtistItem_artist on Artist {\n  name\n  slug\n  href\n}\n\nfragment PartnerArtistList_artists on ArtistPartnerEdge {\n  representedBy\n  counts {\n    artworks\n  }\n  node {\n    internalID\n    ...PartnerArtistItem_artist\n    id\n  }\n}\n\nfragment PartnerArtists_partner on Partner {\n  slug\n  distinguishRepresentedArtists\n  displayFullPartnerPage\n  allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {\n    edges {\n      ...PartnerArtistList_artists\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8eb5527874d6d1a52c849ccd5beab03b';
export default node;
