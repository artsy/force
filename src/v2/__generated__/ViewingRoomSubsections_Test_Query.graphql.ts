/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomSubsections_Test_QueryVariables = {};
export type ViewingRoomSubsections_Test_QueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomSubsections_viewingRoom">;
    } | null;
};
export type ViewingRoomSubsections_Test_Query = {
    readonly response: ViewingRoomSubsections_Test_QueryResponse;
    readonly variables: ViewingRoomSubsections_Test_QueryVariables;
};



/*
query ViewingRoomSubsections_Test_Query {
  viewingRoom(id: "exmaple") {
    ...ViewingRoomSubsections_viewingRoom
  }
}

fragment ViewingRoomSubsections_viewingRoom on ViewingRoom {
  subsections {
    internalID
    title
    body
    image {
      width
      height
      imageURLs {
        normalized
      }
    }
    caption
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "exmaple"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomSubsections_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomSubsections_viewingRoom"
          }
        ],
        "storageKey": "viewingRoom(id:\"exmaple\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRoomSubsections_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomSubsection",
            "kind": "LinkedField",
            "name": "subsections",
            "plural": true,
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "body",
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
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
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
                "kind": "ScalarField",
                "name": "caption",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "viewingRoom(id:\"exmaple\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ViewingRoomSubsections_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomSubsections_Test_Query {\n  viewingRoom(id: \"exmaple\") {\n    ...ViewingRoomSubsections_viewingRoom\n  }\n}\n\nfragment ViewingRoomSubsections_viewingRoom on ViewingRoom {\n  subsections {\n    internalID\n    title\n    body\n    image {\n      width\n      height\n      imageURLs {\n        normalized\n      }\n    }\n    caption\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bbce7a0a898098de2dd72dadea62669b';
export default node;
