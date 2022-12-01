/**
 * @generated SignedSource<<a33dac7cea89609eb0ec5afda723547a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectorProfileRoutes_CollectorProfileQuery$variables = {};
export type collectorProfileRoutes_CollectorProfileQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileApp_me">;
  } | null;
};
export type collectorProfileRoutes_CollectorProfileQuery = {
  response: collectorProfileRoutes_CollectorProfileQuery$data;
  variables: collectorProfileRoutes_CollectorProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "collectorProfileRoutes_CollectorProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectorProfileApp_me"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "collectorProfileRoutes_CollectorProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "icon",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 200
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large_square"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 200
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
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "resized(height:200,version:\"large_square\",width:200)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "otherRelevantPositions",
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
            "name": "bio",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "297b97d004b7f53bd845e3cf95688b90",
    "id": null,
    "metadata": {},
    "name": "collectorProfileRoutes_CollectorProfileQuery",
    "operationKind": "query",
    "text": "query collectorProfileRoutes_CollectorProfileQuery {\n  me {\n    ...CollectorProfileApp_me\n    id\n  }\n}\n\nfragment CollectorProfileApp_me on Me {\n  ...CollectorProfileHeader_me\n  name\n}\n\nfragment CollectorProfileHeaderAvatar_me on Me {\n  icon {\n    resized(height: 200, width: 200, version: \"large_square\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment CollectorProfileHeaderInfo_me on Me {\n  location {\n    display\n    id\n  }\n  profession\n  otherRelevantPositions\n}\n\nfragment CollectorProfileHeader_me on Me {\n  ...CollectorProfileHeaderAvatar_me\n  ...CollectorProfileHeaderInfo_me\n  name\n  bio\n  createdAt\n}\n"
  }
};
})();

(node as any).hash = "a741e51fd09181fa3f4498d97579e413";

export default node;
