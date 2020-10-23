/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_ArtworkQueryVariables = {};
export type consignRoutes_ArtworkQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ConsignApp_artist">;
    } | null;
};
export type consignRoutes_ArtworkQuery = {
    readonly response: consignRoutes_ArtworkQueryResponse;
    readonly variables: consignRoutes_ArtworkQueryVariables;
};



/*
query consignRoutes_ArtworkQuery {
  artist(id: "andy-warhol") @principalField {
    ...ConsignApp_artist
    id
  }
}

fragment ConsignApp_artist on Artist {
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "andy-warhol"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "consignRoutes_ArtworkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConsignApp_artist"
          }
        ],
        "storageKey": "artist(id:\"andy-warhol\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "consignRoutes_ArtworkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"andy-warhol\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "consignRoutes_ArtworkQuery",
    "operationKind": "query",
    "text": "query consignRoutes_ArtworkQuery {\n  artist(id: \"andy-warhol\") @principalField {\n    ...ConsignApp_artist\n    id\n  }\n}\n\nfragment ConsignApp_artist on Artist {\n  name\n}\n"
  }
};
})();
(node as any).hash = '46eaa7b9a62ecbea049aa39f0eb3fabb';
export default node;
