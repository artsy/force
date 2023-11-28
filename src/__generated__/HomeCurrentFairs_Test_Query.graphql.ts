/**
 * @generated SignedSource<<92277648cbb86fa94373c2f65e829152>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeCurrentFairs_Test_Query$variables = Record<PropertyKey, never>;
export type HomeCurrentFairs_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeCurrentFairs_viewer">;
  } | null | undefined;
};
export type HomeCurrentFairs_Test_Query = {
  response: HomeCurrentFairs_Test_Query$data;
  variables: HomeCurrentFairs_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeCurrentFairs_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeCurrentFairs_viewer"
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
    "name": "HomeCurrentFairs_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "hasFullFeature",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "hasListing",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 25
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "START_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "RUNNING"
              }
            ],
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
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
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bannerSize",
                "storageKey": null
              },
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "href",
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
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do"
                  }
                ],
                "kind": "ScalarField",
                "name": "startAt",
                "storageKey": "startAt(format:\"MMM Do\")"
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do YYYY"
                  }
                ],
                "kind": "ScalarField",
                "name": "endAt",
                "storageKey": "endAt(format:\"MMM Do YYYY\")"
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
                        "name": "height",
                        "value": 450
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 600
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
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
                      },
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
                      }
                    ],
                    "storageKey": "cropped(height:450,width:600)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"RUNNING\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "592a02c16f813dfbe77aab629544e6c3",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.fairs": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Fair"
        },
        "viewer.fairs.bannerSize": (v2/*: any*/),
        "viewer.fairs.endAt": (v2/*: any*/),
        "viewer.fairs.exhibitionPeriod": (v2/*: any*/),
        "viewer.fairs.href": (v2/*: any*/),
        "viewer.fairs.id": (v3/*: any*/),
        "viewer.fairs.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.fairs.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "viewer.fairs.image.cropped.height": (v4/*: any*/),
        "viewer.fairs.image.cropped.src": (v5/*: any*/),
        "viewer.fairs.image.cropped.srcSet": (v5/*: any*/),
        "viewer.fairs.image.cropped.width": (v4/*: any*/),
        "viewer.fairs.internalID": (v3/*: any*/),
        "viewer.fairs.isPublished": (v6/*: any*/),
        "viewer.fairs.name": (v2/*: any*/),
        "viewer.fairs.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "viewer.fairs.profile.id": (v3/*: any*/),
        "viewer.fairs.profile.isPublished": (v6/*: any*/),
        "viewer.fairs.slug": (v3/*: any*/),
        "viewer.fairs.startAt": (v2/*: any*/)
      }
    },
    "name": "HomeCurrentFairs_Test_Query",
    "operationKind": "query",
    "text": "query HomeCurrentFairs_Test_Query {\n  viewer {\n    ...HomeCurrentFairs_viewer\n  }\n}\n\nfragment HomeCurrentFairs_viewer on Viewer {\n  fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {\n    internalID\n    slug\n    bannerSize\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    href\n    name\n    startAt(format: \"MMM Do\")\n    endAt(format: \"MMM Do YYYY\")\n    exhibitionPeriod\n    image {\n      cropped(width: 600, height: 450) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee98e3e81b4b9855ba233a5ba124570d";

export default node;
