/**
 * @generated SignedSource<<0bf429de658ae57fcf6ec2541a26cec5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairsIndex_Test_Query$variables = Record<PropertyKey, never>;
export type FairsIndex_Test_Query$data = {
  readonly featuredFairs: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"FairsIndex_featuredFairs">;
  } | null | undefined> | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairsIndex_viewer">;
  } | null | undefined;
};
export type FairsIndex_Test_Query = {
  response: FairsIndex_Test_Query$data;
  variables: FairsIndex_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "art-fairs:featured"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "kind": "Literal",
  "name": "hasFullFeature",
  "value": true
},
v11 = {
  "kind": "Literal",
  "name": "hasListing",
  "value": true
},
v12 = {
  "kind": "Literal",
  "name": "size",
  "value": 25
},
v13 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v14/*: any*/),
    (v8/*: any*/),
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
          "selections": (v7/*: any*/),
          "storageKey": "resized(height:80,version:\"square140\",width:80)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "exhibitionPeriod",
  "storageKey": null
},
v19 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "wide"
  ]
},
v20 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
],
v21 = {
  "alias": "isoStartAt",
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v22 = {
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
        (v16/*: any*/),
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v23 = {
  "kind": "Literal",
  "name": "status",
  "value": "CLOSED"
},
v24 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v10/*: any*/),
  (v11/*: any*/),
  (v13/*: any*/),
  (v23/*: any*/)
],
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v29 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Fair"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FairOrganizer"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairsIndex_Test_Query",
    "selections": [
      {
        "alias": "featuredFairs",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairsIndex_featuredFairs"
          }
        ],
        "storageKey": "orderedSets(key:\"art-fairs:featured\")"
      },
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
            "name": "FairsIndex_viewer"
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
    "name": "FairsIndex_Test_Query",
    "selections": [
      {
        "alias": "featuredFairs",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
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
                            "value": 410
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 547
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": "cropped(height:410,width:547)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": "orderedSets(key:\"art-fairs:featured\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "runningFairs",
            "args": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bannerSize",
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": "large",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 790
                      },
                      (v19/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1840
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v20/*: any*/),
                    "storageKey": "cropped(height:790,version:[\"wide\"],width:1840)"
                  },
                  {
                    "alias": "small",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 512
                      },
                      (v19/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 910
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v20/*: any*/),
                    "storageKey": "cropped(height:512,version:[\"wide\"],width:910)"
                  }
                ],
                "storageKey": null
              },
              (v21/*: any*/),
              (v22/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"RUNNING\")"
          },
          {
            "alias": "closedFairs",
            "args": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v23/*: any*/)
            ],
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v21/*: any*/),
              (v18/*: any*/),
              (v22/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          {
            "alias": "upcomingFairs",
            "args": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "START_AT_ASC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "UPCOMING"
              }
            ],
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "location",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "city",
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/),
              (v22/*: any*/),
              (v16/*: any*/),
              (v21/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
          },
          {
            "alias": "pastFairs",
            "args": (v24/*: any*/),
            "concreteType": "FairConnection",
            "kind": "LinkedField",
            "name": "fairsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FairEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Fair",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v21/*: any*/),
                      (v18/*: any*/),
                      (v22/*: any*/),
                      (v8/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:15,hasFullFeature:true,hasListing:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          {
            "alias": "pastFairs",
            "args": (v24/*: any*/),
            "filters": [
              "hasListing",
              "hasFullFeature",
              "sort",
              "status"
            ],
            "handle": "connection",
            "key": "FairsPastFairsQuery_pastFairs",
            "kind": "LinkedHandle",
            "name": "fairsConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f9e17581ab90c10410b7ed01b52f710c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredFairs": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSet"
        },
        "featuredFairs.id": (v25/*: any*/),
        "featuredFairs.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "featuredFairs.items.__isNode": (v26/*: any*/),
        "featuredFairs.items.__typename": (v26/*: any*/),
        "featuredFairs.items.id": (v25/*: any*/),
        "featuredFairs.items.image": (v27/*: any*/),
        "featuredFairs.items.image.cropped": (v28/*: any*/),
        "featuredFairs.items.image.cropped.height": (v29/*: any*/),
        "featuredFairs.items.image.cropped.src": (v26/*: any*/),
        "featuredFairs.items.image.cropped.srcSet": (v26/*: any*/),
        "featuredFairs.items.image.cropped.width": (v29/*: any*/),
        "featuredFairs.items.internalID": (v25/*: any*/),
        "featuredFairs.items.title": (v30/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.closedFairs": (v31/*: any*/),
        "viewer.closedFairs.exhibitionPeriod": (v30/*: any*/),
        "viewer.closedFairs.href": (v30/*: any*/),
        "viewer.closedFairs.id": (v25/*: any*/),
        "viewer.closedFairs.internalID": (v25/*: any*/),
        "viewer.closedFairs.isPublished": (v32/*: any*/),
        "viewer.closedFairs.isoStartAt": (v30/*: any*/),
        "viewer.closedFairs.name": (v30/*: any*/),
        "viewer.closedFairs.organizer": (v33/*: any*/),
        "viewer.closedFairs.organizer.id": (v25/*: any*/),
        "viewer.closedFairs.organizer.profile": (v34/*: any*/),
        "viewer.closedFairs.organizer.profile.href": (v30/*: any*/),
        "viewer.closedFairs.organizer.profile.id": (v25/*: any*/),
        "viewer.closedFairs.profile": (v34/*: any*/),
        "viewer.closedFairs.profile.icon": (v27/*: any*/),
        "viewer.closedFairs.profile.icon.resized": (v35/*: any*/),
        "viewer.closedFairs.profile.icon.resized.height": (v36/*: any*/),
        "viewer.closedFairs.profile.icon.resized.src": (v26/*: any*/),
        "viewer.closedFairs.profile.icon.resized.srcSet": (v26/*: any*/),
        "viewer.closedFairs.profile.icon.resized.width": (v36/*: any*/),
        "viewer.closedFairs.profile.id": (v25/*: any*/),
        "viewer.closedFairs.profile.isPublished": (v32/*: any*/),
        "viewer.pastFairs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairConnection"
        },
        "viewer.pastFairs.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairEdge"
        },
        "viewer.pastFairs.edges.cursor": (v26/*: any*/),
        "viewer.pastFairs.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "viewer.pastFairs.edges.node.__typename": (v26/*: any*/),
        "viewer.pastFairs.edges.node.exhibitionPeriod": (v30/*: any*/),
        "viewer.pastFairs.edges.node.href": (v30/*: any*/),
        "viewer.pastFairs.edges.node.id": (v25/*: any*/),
        "viewer.pastFairs.edges.node.internalID": (v25/*: any*/),
        "viewer.pastFairs.edges.node.isPublished": (v32/*: any*/),
        "viewer.pastFairs.edges.node.isoStartAt": (v30/*: any*/),
        "viewer.pastFairs.edges.node.name": (v30/*: any*/),
        "viewer.pastFairs.edges.node.organizer": (v33/*: any*/),
        "viewer.pastFairs.edges.node.organizer.id": (v25/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile": (v34/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile.href": (v30/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile.id": (v25/*: any*/),
        "viewer.pastFairs.edges.node.profile": (v34/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon": (v27/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized": (v35/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.height": (v36/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.src": (v26/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.srcSet": (v26/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.width": (v36/*: any*/),
        "viewer.pastFairs.edges.node.profile.id": (v25/*: any*/),
        "viewer.pastFairs.edges.node.profile.isPublished": (v32/*: any*/),
        "viewer.pastFairs.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.pastFairs.pageInfo.endCursor": (v30/*: any*/),
        "viewer.pastFairs.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.runningFairs": (v31/*: any*/),
        "viewer.runningFairs.bannerSize": (v30/*: any*/),
        "viewer.runningFairs.exhibitionPeriod": (v30/*: any*/),
        "viewer.runningFairs.href": (v30/*: any*/),
        "viewer.runningFairs.id": (v25/*: any*/),
        "viewer.runningFairs.image": (v27/*: any*/),
        "viewer.runningFairs.image.large": (v28/*: any*/),
        "viewer.runningFairs.image.large.height": (v29/*: any*/),
        "viewer.runningFairs.image.large.src": (v26/*: any*/),
        "viewer.runningFairs.image.large.srcSet": (v26/*: any*/),
        "viewer.runningFairs.image.large.width": (v29/*: any*/),
        "viewer.runningFairs.image.small": (v28/*: any*/),
        "viewer.runningFairs.image.small.height": (v29/*: any*/),
        "viewer.runningFairs.image.small.src": (v26/*: any*/),
        "viewer.runningFairs.image.small.srcSet": (v26/*: any*/),
        "viewer.runningFairs.image.small.width": (v29/*: any*/),
        "viewer.runningFairs.internalID": (v25/*: any*/),
        "viewer.runningFairs.isPublished": (v32/*: any*/),
        "viewer.runningFairs.isoStartAt": (v30/*: any*/),
        "viewer.runningFairs.name": (v30/*: any*/),
        "viewer.runningFairs.organizer": (v33/*: any*/),
        "viewer.runningFairs.organizer.id": (v25/*: any*/),
        "viewer.runningFairs.organizer.profile": (v34/*: any*/),
        "viewer.runningFairs.organizer.profile.href": (v30/*: any*/),
        "viewer.runningFairs.organizer.profile.id": (v25/*: any*/),
        "viewer.runningFairs.profile": (v34/*: any*/),
        "viewer.runningFairs.profile.icon": (v27/*: any*/),
        "viewer.runningFairs.profile.icon.resized": (v35/*: any*/),
        "viewer.runningFairs.profile.icon.resized.height": (v36/*: any*/),
        "viewer.runningFairs.profile.icon.resized.src": (v26/*: any*/),
        "viewer.runningFairs.profile.icon.resized.srcSet": (v26/*: any*/),
        "viewer.runningFairs.profile.icon.resized.width": (v36/*: any*/),
        "viewer.runningFairs.profile.id": (v25/*: any*/),
        "viewer.runningFairs.profile.isPublished": (v32/*: any*/),
        "viewer.upcomingFairs": (v31/*: any*/),
        "viewer.upcomingFairs.exhibitionPeriod": (v30/*: any*/),
        "viewer.upcomingFairs.href": (v30/*: any*/),
        "viewer.upcomingFairs.id": (v25/*: any*/),
        "viewer.upcomingFairs.internalID": (v25/*: any*/),
        "viewer.upcomingFairs.isPublished": (v32/*: any*/),
        "viewer.upcomingFairs.isoStartAt": (v30/*: any*/),
        "viewer.upcomingFairs.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "viewer.upcomingFairs.location.city": (v30/*: any*/),
        "viewer.upcomingFairs.location.id": (v25/*: any*/),
        "viewer.upcomingFairs.name": (v30/*: any*/),
        "viewer.upcomingFairs.organizer": (v33/*: any*/),
        "viewer.upcomingFairs.organizer.id": (v25/*: any*/),
        "viewer.upcomingFairs.organizer.profile": (v34/*: any*/),
        "viewer.upcomingFairs.organizer.profile.href": (v30/*: any*/),
        "viewer.upcomingFairs.organizer.profile.id": (v25/*: any*/),
        "viewer.upcomingFairs.profile": (v34/*: any*/),
        "viewer.upcomingFairs.profile.icon": (v27/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized": (v35/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.height": (v36/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.src": (v26/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.srcSet": (v26/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.width": (v36/*: any*/),
        "viewer.upcomingFairs.profile.id": (v25/*: any*/),
        "viewer.upcomingFairs.profile.isPublished": (v32/*: any*/)
      }
    },
    "name": "FairsIndex_Test_Query",
    "operationKind": "query",
    "text": "query FairsIndex_Test_Query {\n  featuredFairs: orderedSets(key: \"art-fairs:featured\") {\n    ...FairsIndex_featuredFairs\n    id\n  }\n  viewer {\n    ...FairsIndex_viewer\n  }\n}\n\nfragment FairsFairBanner_fair on Fair {\n  href\n  name\n  exhibitionPeriod\n  bannerSize\n  image {\n    large: cropped(width: 1840, height: 790, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    small: cropped(width: 910, height: 512, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairsFairRow_fair on Fair {\n  href\n  name\n  isoStartAt: startAt\n  exhibitionPeriod\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  organizer {\n    profile {\n      href\n      id\n    }\n    id\n  }\n}\n\nfragment FairsIndex_featuredFairs on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      image {\n        cropped(width: 547, height: 410) {\n          width\n          height\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment FairsIndex_viewer on Viewer {\n  runningFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {\n    internalID\n    bannerSize\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairBanner_fair\n    ...FairsFairRow_fair\n    id\n  }\n  closedFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: CLOSED) {\n    internalID\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  upcomingFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_ASC, size: 25, status: UPCOMING) {\n    internalID\n    name\n    exhibitionPeriod\n    location {\n      city\n      id\n    }\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    organizer {\n      profile {\n        href\n        id\n      }\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  ...FairsPastFairs_viewer\n}\n\nfragment FairsPastFairs_viewer on Viewer {\n  pastFairs: fairsConnection(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, status: CLOSED, first: 15) {\n    edges {\n      node {\n        internalID\n        isPublished\n        profile {\n          isPublished\n          id\n        }\n        ...FairsFairRow_fair\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a4ec4099482420eff47b1546822880b8";

export default node;
