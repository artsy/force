/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsRail_Test_QueryVariables = {
    partnerId: string;
};
export type ArtistsRail_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistsRail_partner">;
    } | null;
};
export type ArtistsRail_Test_Query = {
    readonly response: ArtistsRail_Test_QueryResponse;
    readonly variables: ArtistsRail_Test_QueryVariables;
};



/*
query ArtistsRail_Test_Query(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    ...ArtistsRail_partner
    id
  }
}

fragment ArtistsRail_partner on Partner {
  slug
  profileArtistsLayout
  displayFullPartnerPage
  artistsWithPublishedArtworks: artistsConnection(hasPublishedArtworks: true, displayOnPartnerProfile: true) {
    totalCount
  }
  representedArtistsWithoutPublishedArtworks: artistsConnection(representedBy: true, hasPublishedArtworks: false, displayOnPartnerProfile: true) {
    totalCount
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
  "kind": "Literal",
  "name": "displayOnPartnerProfile",
  "value": true
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v4 = {
  "type": "ArtistPartnerConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistsRail_Test_Query",
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
            "name": "ArtistsRail_partner"
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
    "name": "ArtistsRail_Test_Query",
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
            "name": "displayFullPartnerPage",
            "storageKey": null
          },
          {
            "alias": "artistsWithPublishedArtworks",
            "args": [
              (v2/*: any*/),
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
            "selections": (v3/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:true)"
          },
          {
            "alias": "representedArtistsWithoutPublishedArtworks",
            "args": [
              (v2/*: any*/),
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
            "selections": (v3/*: any*/),
            "storageKey": "artistsConnection(displayOnPartnerProfile:true,hasPublishedArtworks:false,representedBy:true)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
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
        "partner.profileArtistsLayout": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.displayFullPartnerPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.artistsWithPublishedArtworks": (v4/*: any*/),
        "partner.representedArtistsWithoutPublishedArtworks": (v4/*: any*/),
        "partner.artistsWithPublishedArtworks.totalCount": (v5/*: any*/),
        "partner.representedArtistsWithoutPublishedArtworks.totalCount": (v5/*: any*/)
      }
    },
    "name": "ArtistsRail_Test_Query",
    "operationKind": "query",
    "text": "query ArtistsRail_Test_Query(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...ArtistsRail_partner\n    id\n  }\n}\n\nfragment ArtistsRail_partner on Partner {\n  slug\n  profileArtistsLayout\n  displayFullPartnerPage\n  artistsWithPublishedArtworks: artistsConnection(hasPublishedArtworks: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  representedArtistsWithoutPublishedArtworks: artistsConnection(representedBy: true, hasPublishedArtworks: false, displayOnPartnerProfile: true) {\n    totalCount\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fe6a6fad0020c4c863a1e00cc34eba06';
export default node;
