/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_Test_QueryVariables = {
    slug: string;
};
export type ViewingRoomApp_Test_QueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomApp_viewingRoom">;
    } | null;
};
export type ViewingRoomApp_Test_QueryRawResponse = {
    readonly viewingRoom: ({
        readonly title: string;
        readonly heroImageURL: string | null;
        readonly partner: ({
            readonly name: string | null;
            readonly id: string | null;
        }) | null;
        readonly formattedEndAt: string | null;
    }) | null;
};
export type ViewingRoomApp_Test_Query = {
    readonly response: ViewingRoomApp_Test_QueryResponse;
    readonly variables: ViewingRoomApp_Test_QueryVariables;
    readonly rawResponse: ViewingRoomApp_Test_QueryRawResponse;
};



/*
query ViewingRoomApp_Test_Query(
  $slug: ID!
) {
  viewingRoom(id: $slug) {
    ...ViewingRoomApp_viewingRoom
  }
}

fragment ViewingRoomApp_viewingRoom on ViewingRoom {
  ...ViewingRoomMeta_viewingRoom
  ...ViewingRoomHeader_viewingRoom
}

fragment ViewingRoomHeader_viewingRoom on ViewingRoom {
  heroImageURL
  title
  partner {
    name
    id
  }
  formattedEndAt
}

fragment ViewingRoomMeta_viewingRoom on ViewingRoom {
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ViewingRoomApp_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRoom",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomApp_viewingRoom",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ViewingRoomApp_Test_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRoom",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "heroImageURL",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "formattedEndAt",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ViewingRoomApp_Test_Query",
    "id": null,
    "text": "query ViewingRoomApp_Test_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomApp_viewingRoom\n  }\n}\n\nfragment ViewingRoomApp_viewingRoom on ViewingRoom {\n  ...ViewingRoomMeta_viewingRoom\n  ...ViewingRoomHeader_viewingRoom\n}\n\nfragment ViewingRoomHeader_viewingRoom on ViewingRoom {\n  heroImageURL\n  title\n  partner {\n    name\n    id\n  }\n  formattedEndAt\n}\n\nfragment ViewingRoomMeta_viewingRoom on ViewingRoom {\n  title\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '8749bcc17435f6b8c12ef726f58c5866';
export default node;
