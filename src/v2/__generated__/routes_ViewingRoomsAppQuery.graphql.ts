/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ViewingRoomsAppQueryVariables = {};
export type routes_ViewingRoomsAppQueryResponse = {
    readonly viewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_viewingRooms">;
    } | null;
};
export type routes_ViewingRoomsAppQuery = {
    readonly response: routes_ViewingRoomsAppQueryResponse;
    readonly variables: routes_ViewingRoomsAppQueryVariables;
};



/*
query routes_ViewingRoomsAppQuery {
  viewingRooms {
    ...ViewingRoomsApp_viewingRooms
  }
}

fragment ViewingRoomsApp_viewingRooms on ViewingRoomConnection {
  edges {
    node {
      slug
      status
      title
    }
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ViewingRoomsAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRooms",
        "storageKey": null,
        "args": null,
        "concreteType": "ViewingRoomConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_viewingRooms",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ViewingRoomsAppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRooms",
        "storageKey": null,
        "args": null,
        "concreteType": "ViewingRoomConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "ViewingRoomEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewingRoom",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slug",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "status",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "title",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ViewingRoomsAppQuery",
    "id": null,
    "text": "query routes_ViewingRoomsAppQuery {\n  viewingRooms {\n    ...ViewingRoomsApp_viewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_viewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      slug\n      status\n      title\n    }\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'd455fbea22d4042ba5fb4bd5e0564f5b';
export default node;
