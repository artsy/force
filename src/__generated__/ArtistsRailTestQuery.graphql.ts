/**
 * @generated SignedSource<<de7b7dad63cdfc80c5d4c629cf164a47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsRailTestQuery$variables = {
  partnerId: string;
};
export type ArtistsRailTestQuery$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistsRail_partner">;
  } | null | undefined;
};
export type ArtistsRailTestQuery = {
  response: ArtistsRailTestQuery$data;
  variables: ArtistsRailTestQuery$variables;
};

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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistPartnerConnection"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistsRailTestQuery",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistsRailTestQuery",
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
    "cacheID": "fb3604fce6a723d46064b350cb730150",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.artistsWithPublishedArtworks": (v4/*: any*/),
        "partner.artistsWithPublishedArtworks.totalCount": (v5/*: any*/),
        "partner.displayFullPartnerPage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "partner.id": (v6/*: any*/),
        "partner.profileArtistsLayout": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "partner.representedArtistsWithoutPublishedArtworks": (v4/*: any*/),
        "partner.representedArtistsWithoutPublishedArtworks.totalCount": (v5/*: any*/),
        "partner.slug": (v6/*: any*/)
      }
    },
    "name": "ArtistsRailTestQuery",
    "operationKind": "query",
    "text": "query ArtistsRailTestQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...ArtistsRail_partner\n    id\n  }\n}\n\nfragment ArtistsRail_partner on Partner {\n  slug\n  profileArtistsLayout\n  displayFullPartnerPage\n  artistsWithPublishedArtworks: artistsConnection(hasPublishedArtworks: true, displayOnPartnerProfile: true) {\n    totalCount\n  }\n  representedArtistsWithoutPublishedArtworks: artistsConnection(representedBy: true, hasPublishedArtworks: false, displayOnPartnerProfile: true) {\n    totalCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "9fcb11a2d4e58b52b4de3fd809a07fe1";

export default node;
