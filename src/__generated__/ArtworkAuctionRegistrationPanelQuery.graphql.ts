/**
 * @generated SignedSource<<955c6b38da8cf3ae8536d89193a626e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionRegistrationPanelQuery$variables = Record<PropertyKey, never>;
export type ArtworkAuctionRegistrationPanelQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionRegistrationPanel_artwork">;
  } | null | undefined;
};
export type ArtworkAuctionRegistrationPanelQuery = {
  response: ArtworkAuctionRegistrationPanelQuery$data;
  variables: ArtworkAuctionRegistrationPanelQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkAuctionRegistrationPanelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkAuctionRegistrationPanel_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkAuctionRegistrationPanelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
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
                "name": "registrationEndsAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "39848c0dc33774f02593016a81650b7a",
    "id": null,
    "metadata": {},
    "name": "ArtworkAuctionRegistrationPanelQuery",
    "operationKind": "query",
    "text": "query ArtworkAuctionRegistrationPanelQuery {\n  artwork(id: \"example\") {\n    ...ArtworkAuctionRegistrationPanel_artwork\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "df32bd3805ff94815d2367de7126bf4b";

export default node;
