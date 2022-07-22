/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistsQueryVariables = {
    partnerId: string;
};
export type PartnerArtistsQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerArtists_partner">;
    } | null;
};
export type PartnerArtistsQuery = {
    readonly response: PartnerArtistsQueryResponse;
    readonly variables: PartnerArtistsQueryVariables;
};



/*
query PartnerArtistsQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    ...PartnerArtists_partner
    id
  }
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
    "name": "partnerId"
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
  "name": "slug",
  "storageKey": null
},
v3 = {
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
    "name": "PartnerArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerArtists_partner"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PartnerArtistsQuery",
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ab6b4d6f1ef7c11f63b213f7c21e5c83",
    "id": null,
    "metadata": {},
    "name": "PartnerArtistsQuery",
    "operationKind": "query",
    "text": "query PartnerArtistsQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...PartnerArtists_partner\n    id\n  }\n}\n\nfragment PartnerArtistItem_artist on Artist {\n  name\n  slug\n  href\n}\n\nfragment PartnerArtistList_artists on ArtistPartnerEdge {\n  representedBy\n  counts {\n    artworks\n  }\n  node {\n    internalID\n    ...PartnerArtistItem_artist\n    id\n  }\n}\n\nfragment PartnerArtists_partner on Partner {\n  slug\n  distinguishRepresentedArtists\n  displayFullPartnerPage\n  allArtistsConnection(displayOnPartnerProfile: true, hasNotRepresentedArtistWithPublishedArtworks: true) {\n    edges {\n      ...PartnerArtistList_artists\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3dc0b320c725913caf67d58c3a19af9e';
export default node;
