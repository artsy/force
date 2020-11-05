/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_Test_QueryVariables = {};
export type ShowInstallShots_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowInstallShots_show">;
    } | null;
};
export type ShowInstallShots_Test_Query = {
    readonly response: ShowInstallShots_Test_QueryResponse;
    readonly variables: ShowInstallShots_Test_QueryVariables;
};



/*
query ShowInstallShots_Test_Query {
  show(id: "xxx") {
    ...ShowInstallShots_show
    id
  }
}

fragment ShowInstallShots_show on Show {
  name
  images(default: false) {
    internalID
    caption
    mobile: resized(height: 300) {
      width
      height
    }
    desktop: resized(height: 400, version: ["larger", "large"]) {
      src
      srcSet
      width
      height
    }
    zoom: resized(width: 900, height: 900, version: ["larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v4 = [
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
  },
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowInstallShots_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowInstallShots_show"
          }
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowInstallShots_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
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
            "args": [
              {
                "kind": "Literal",
                "name": "default",
                "value": false
              }
            ],
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
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
                "name": "caption",
                "storageKey": null
              },
              {
                "alias": "mobile",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 300
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": "resized(height:300)"
              },
              {
                "alias": "desktop",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 400
                  },
                  (v3/*: any*/)
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": "resized(height:400,version:[\"larger\",\"large\"])"
              },
              {
                "alias": "zoom",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 900
                  },
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 900
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": "resized(height:900,version:[\"larger\",\"large\"],width:900)"
              }
            ],
            "storageKey": "images(default:false)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ShowInstallShots_Test_Query",
    "operationKind": "query",
    "text": "query ShowInstallShots_Test_Query {\n  show(id: \"xxx\") {\n    ...ShowInstallShots_show\n    id\n  }\n}\n\nfragment ShowInstallShots_show on Show {\n  name\n  images(default: false) {\n    internalID\n    caption\n    mobile: resized(height: 300) {\n      width\n      height\n    }\n    desktop: resized(height: 400, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    zoom: resized(width: 900, height: 900, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5e5440a7341ea09d022f5e312808c3f7';
export default node;
