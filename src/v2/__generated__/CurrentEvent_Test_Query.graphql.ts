/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrentEvent_Test_QueryVariables = {};
export type CurrentEvent_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"CurrentEvent_artist">;
    } | null;
};
export type CurrentEvent_Test_QueryRawResponse = {
    readonly artist: ({
        readonly currentEvent: ({
            readonly event: {
                readonly __typename: string;
                readonly id: string | null;
            };
            readonly image: ({
                readonly resized: ({
                    readonly url: string;
                }) | null;
            }) | null;
            readonly name: string | null;
            readonly status: string | null;
            readonly details: string | null;
            readonly partner: string | null;
            readonly href: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type CurrentEvent_Test_Query = {
    readonly response: CurrentEvent_Test_QueryResponse;
    readonly variables: CurrentEvent_Test_QueryVariables;
    readonly rawResponse: CurrentEvent_Test_QueryRawResponse;
};



/*
query CurrentEvent_Test_Query {
  artist(id: "pablo-picasso") {
    ...CurrentEvent_artist
    id
  }
}

fragment CurrentEvent_artist on Artist {
  currentEvent {
    event {
      __typename
      ... on Node {
        id
      }
    }
    image {
      resized(width: 300) {
        url
      }
    }
    name
    status
    details
    partner
    href
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "pablo-picasso"
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
    "name": "CurrentEvent_Test_Query",
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
            "name": "CurrentEvent_artist"
          }
        ],
        "storageKey": "artist(id:\"pablo-picasso\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurrentEvent_Test_Query",
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
            "concreteType": "CurrentEvent",
            "kind": "LinkedField",
            "name": "currentEvent",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "event",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "resized(width:300)"
                  }
                ],
                "storageKey": null
              },
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
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "details",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partner",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "href",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"pablo-picasso\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CurrentEvent_Test_Query",
    "operationKind": "query",
    "text": "query CurrentEvent_Test_Query {\n  artist(id: \"pablo-picasso\") {\n    ...CurrentEvent_artist\n    id\n  }\n}\n\nfragment CurrentEvent_artist on Artist {\n  currentEvent {\n    event {\n      __typename\n      ... on Node {\n        id\n      }\n    }\n    image {\n      resized(width: 300) {\n        url\n      }\n    }\n    name\n    status\n    details\n    partner\n    href\n  }\n}\n"
  }
};
})();
(node as any).hash = '66158d06a67fe4f3db5a8b86baaf36ed';
export default node;
