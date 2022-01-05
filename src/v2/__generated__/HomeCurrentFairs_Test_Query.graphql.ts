/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeCurrentFairs_Test_QueryVariables = {};
export type HomeCurrentFairs_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"HomeCurrentFairs_viewer">;
    } | null;
};
export type HomeCurrentFairs_Test_Query = {
    readonly response: HomeCurrentFairs_Test_QueryResponse;
    readonly variables: HomeCurrentFairs_Test_QueryVariables;
};



/*
query HomeCurrentFairs_Test_Query {
  viewer {
    ...HomeCurrentFairs_viewer
  }
}

fragment HomeCurrentFairs_viewer on Viewer {
  fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {
    internalID
    slug
    bannerSize
    isPublished
    profile {
      isPublished
      id
    }
    href
    name
    startAt(format: "MMM Do")
    endAt(format: "MMM Do YYYY")
    exhibitionPeriod
    image {
      cropped(width: 600, height: 450) {
        src
        srcSet
        width
        height
      }
    }
    id
  }
}
*/

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.fairs": {
          "type": "Fair",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.fairs.internalID": (v2/*: any*/),
        "viewer.fairs.slug": (v2/*: any*/),
        "viewer.fairs.bannerSize": (v3/*: any*/),
        "viewer.fairs.isPublished": (v4/*: any*/),
        "viewer.fairs.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.fairs.href": (v3/*: any*/),
        "viewer.fairs.name": (v3/*: any*/),
        "viewer.fairs.startAt": (v3/*: any*/),
        "viewer.fairs.endAt": (v3/*: any*/),
        "viewer.fairs.exhibitionPeriod": (v3/*: any*/),
        "viewer.fairs.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.fairs.id": (v5/*: any*/),
        "viewer.fairs.profile.isPublished": (v4/*: any*/),
        "viewer.fairs.profile.id": (v5/*: any*/),
        "viewer.fairs.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.fairs.image.cropped.src": (v6/*: any*/),
        "viewer.fairs.image.cropped.srcSet": (v6/*: any*/),
        "viewer.fairs.image.cropped.width": (v7/*: any*/),
        "viewer.fairs.image.cropped.height": (v7/*: any*/)
      }
    },
    "name": "HomeCurrentFairs_Test_Query",
    "operationKind": "query",
    "text": "query HomeCurrentFairs_Test_Query {\n  viewer {\n    ...HomeCurrentFairs_viewer\n  }\n}\n\nfragment HomeCurrentFairs_viewer on Viewer {\n  fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {\n    internalID\n    slug\n    bannerSize\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    href\n    name\n    startAt(format: \"MMM Do\")\n    endAt(format: \"MMM Do YYYY\")\n    exhibitionPeriod\n    image {\n      cropped(width: 600, height: 450) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ee98e3e81b4b9855ba233a5ba124570d';
export default node;
