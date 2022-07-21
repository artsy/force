/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_ClosedTest_QueryVariables = {
    slug: string;
};
export type ViewingRoomApp_ClosedTest_QueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomApp_viewingRoom">;
    } | null;
};
export type ViewingRoomApp_ClosedTest_QueryRawResponse = {
    readonly viewingRoom: ({
        readonly title: string;
        readonly href: string | null;
        readonly pullQuote: string | null;
        readonly image: ({
            readonly imageURLs: ({
                readonly normalized: string | null;
            }) | null;
        }) | null;
        readonly partner: ({
            readonly name: string | null;
            readonly href: string | null;
            readonly id: string;
            readonly internalID: string;
        }) | null;
        readonly distanceToOpen: string | null;
        readonly distanceToClose: string | null;
        readonly status: string;
    }) | null;
};
export type ViewingRoomApp_ClosedTest_Query = {
    readonly response: ViewingRoomApp_ClosedTest_QueryResponse;
    readonly variables: ViewingRoomApp_ClosedTest_QueryVariables;
    readonly rawResponse: ViewingRoomApp_ClosedTest_QueryRawResponse;
};



/*
query ViewingRoomApp_ClosedTest_Query(
  $slug: ID!
) {
  viewingRoom(id: $slug) {
    ...ViewingRoomApp_viewingRoom
  }
}

fragment ViewingRoomApp_viewingRoom on ViewingRoom {
  ...ViewingRoomMeta_viewingRoom
  ...ViewingRoomHeader_viewingRoom
  ...ViewingRoomContentNotAccessible_viewingRoom
  partner {
    internalID
    id
  }
  status
}

fragment ViewingRoomContentNotAccessible_viewingRoom on ViewingRoom {
  status
  partner {
    href
    id
  }
}

fragment ViewingRoomHeader_viewingRoom on ViewingRoom {
  image {
    imageURLs {
      normalized
    }
  }
  title
  partner {
    name
    href
    id
  }
  distanceToOpen
  distanceToClose
  status
}

fragment ViewingRoomMeta_viewingRoom on ViewingRoom {
  title
  href
  pullQuote
  image {
    imageURLs {
      normalized
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomApp_ClosedTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomApp_viewingRoom"
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
    "name": "ViewingRoomApp_ClosedTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pullQuote",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ARImage",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ImageURLs",
                "kind": "LinkedField",
                "name": "imageURLs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "normalized",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
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
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "distanceToOpen",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "distanceToClose",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1fd50573ca945b9f3bcdf76ad516089d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "viewingRoom.distanceToClose": (v3/*: any*/),
        "viewingRoom.distanceToOpen": (v3/*: any*/),
        "viewingRoom.href": (v3/*: any*/),
        "viewingRoom.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ARImage"
        },
        "viewingRoom.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ImageURLs"
        },
        "viewingRoom.image.imageURLs.normalized": (v3/*: any*/),
        "viewingRoom.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewingRoom.partner.href": (v3/*: any*/),
        "viewingRoom.partner.id": (v4/*: any*/),
        "viewingRoom.partner.internalID": (v4/*: any*/),
        "viewingRoom.partner.name": (v3/*: any*/),
        "viewingRoom.pullQuote": (v3/*: any*/),
        "viewingRoom.status": (v5/*: any*/),
        "viewingRoom.title": (v5/*: any*/)
      }
    },
    "name": "ViewingRoomApp_ClosedTest_Query",
    "operationKind": "query",
    "text": "query ViewingRoomApp_ClosedTest_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomApp_viewingRoom\n  }\n}\n\nfragment ViewingRoomApp_viewingRoom on ViewingRoom {\n  ...ViewingRoomMeta_viewingRoom\n  ...ViewingRoomHeader_viewingRoom\n  ...ViewingRoomContentNotAccessible_viewingRoom\n  partner {\n    internalID\n    id\n  }\n  status\n}\n\nfragment ViewingRoomContentNotAccessible_viewingRoom on ViewingRoom {\n  status\n  partner {\n    href\n    id\n  }\n}\n\nfragment ViewingRoomHeader_viewingRoom on ViewingRoom {\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n  title\n  partner {\n    name\n    href\n    id\n  }\n  distanceToOpen\n  distanceToClose\n  status\n}\n\nfragment ViewingRoomMeta_viewingRoom on ViewingRoom {\n  title\n  href\n  pullQuote\n  image {\n    imageURLs {\n      normalized\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5e34e5d32d2037f27a844de6ebad2cb1';
export default node;
