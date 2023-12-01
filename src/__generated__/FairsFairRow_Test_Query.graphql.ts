/**
 * @generated SignedSource<<8dd90cb8767c179a98e279ecb1169555>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairsFairRow_Test_Query$variables = Record<PropertyKey, never>;
export type FairsFairRow_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairsFairRow_fair">;
  } | null | undefined;
};
export type FairsFairRow_Test_Query = {
  response: FairsFairRow_Test_Query$data;
  variables: FairsFairRow_Test_Query$variables;
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
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v7 = {
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
    "name": "FairsFairRow_Test_Query",
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
            "name": "FairsFairRow_fair"
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
    "name": "FairsFairRow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": "isoStartAt",
            "args": null,
            "kind": "ScalarField",
            "name": "startAt",
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
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square140"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
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
                    "storageKey": "resized(height:80,version:\"square140\",width:80)"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FairOrganizer",
            "kind": "LinkedField",
            "name": "organizer",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "ac7a6decfefaa17b5b4db2bc99877d86",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.exhibitionPeriod": (v3/*: any*/),
        "fair.href": (v3/*: any*/),
        "fair.id": (v4/*: any*/),
        "fair.isoStartAt": (v3/*: any*/),
        "fair.name": (v3/*: any*/),
        "fair.organizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fair.organizer.id": (v4/*: any*/),
        "fair.organizer.profile": (v5/*: any*/),
        "fair.organizer.profile.href": (v3/*: any*/),
        "fair.organizer.profile.id": (v4/*: any*/),
        "fair.profile": (v5/*: any*/),
        "fair.profile.icon": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fair.profile.icon.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "fair.profile.icon.resized.height": (v6/*: any*/),
        "fair.profile.icon.resized.src": (v7/*: any*/),
        "fair.profile.icon.resized.srcSet": (v7/*: any*/),
        "fair.profile.icon.resized.width": (v6/*: any*/),
        "fair.profile.id": (v4/*: any*/)
      }
    },
    "name": "FairsFairRow_Test_Query",
    "operationKind": "query",
    "text": "query FairsFairRow_Test_Query {\n  fair(id: \"example\") {\n    ...FairsFairRow_fair\n    id\n  }\n}\n\nfragment FairsFairRow_fair on Fair {\n  href\n  name\n  isoStartAt: startAt\n  exhibitionPeriod\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  organizer {\n    profile {\n      href\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "aeac823bc4ecfdfaaefb428618e8e491";

export default node;
