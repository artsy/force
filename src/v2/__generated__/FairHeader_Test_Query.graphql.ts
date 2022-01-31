/**
 * @generated SignedSource<<18953e9953b84c1d2c43a4937c133d36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairHeader_Test_Query$variables = {};
export type FairHeader_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairHeader_fair">;
  } | null;
};
export type FairHeader_Test_Query = {
  variables: FairHeader_Test_Query$variables;
  response: FairHeader_Test_Query$data;
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
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v2 = [
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
  {
    "alias": "size",
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairHeader_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
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
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
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
                    "alias": "desktop",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
                      (v1/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:80,version:\"square140\",width:80)"
                  },
                  {
                    "alias": "mobile",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 60
                      },
                      (v1/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 60
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:60,version:\"square140\",width:60)"
                  },
                  {
                    "alias": "sticky",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 50
                      },
                      (v1/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 50
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:50,version:\"square140\",width:50)"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "8349d265a9eecfe9bbfe968af32acedc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.exhibitionPeriod": (v4/*: any*/),
        "fair.id": (v5/*: any*/),
        "fair.name": (v4/*: any*/),
        "fair.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.profile.icon": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fair.profile.icon.desktop": (v6/*: any*/),
        "fair.profile.icon.desktop.size": (v7/*: any*/),
        "fair.profile.icon.desktop.src": (v8/*: any*/),
        "fair.profile.icon.desktop.srcSet": (v8/*: any*/),
        "fair.profile.icon.mobile": (v6/*: any*/),
        "fair.profile.icon.mobile.size": (v7/*: any*/),
        "fair.profile.icon.mobile.src": (v8/*: any*/),
        "fair.profile.icon.mobile.srcSet": (v8/*: any*/),
        "fair.profile.icon.sticky": (v6/*: any*/),
        "fair.profile.icon.sticky.size": (v7/*: any*/),
        "fair.profile.icon.sticky.src": (v8/*: any*/),
        "fair.profile.icon.sticky.srcSet": (v8/*: any*/),
        "fair.profile.id": (v5/*: any*/)
      }
    },
    "name": "FairHeader_Test_Query",
    "operationKind": "query",
    "text": "query FairHeader_Test_Query {\n  fair(id: \"example\") {\n    ...FairHeader_fair\n    id\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  name\n  exhibitionPeriod\n  profile {\n    icon {\n      desktop: cropped(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      sticky: cropped(width: 50, height: 50, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "636084f15ab257f7f0469e1054238fb5";

export default node;
